import {authenticate, TokenService, UserService} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {model, property, repository} from '@loopback/repository';
import {get, HttpErrors, param, post, requestBody, SchemaObject} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {genSalt, hash} from 'bcryptjs';
import _ from 'lodash';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import {v4 as uuidv4} from 'uuid';
import {PasswordHasherBindings, TokenServiceBindings, UserServiceBindings} from '../keys';
import {basicAuthorization} from '../middlewares/auth.midd';
import {User} from '../models';
import {KeyAndPassword} from '../models/key-and-password.model';
import {ResetPasswordInit} from '../models/reset-password-init.model';
import {Credentials, UserCredentialsRepository, UserRepository} from '../repositories';
import {EmailService, PasswordHasher, validateCredentials} from '../services';
import {renderCode, renderWelcome} from '../templates/htmltemplates';
const UserProfileSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: {type: 'string'},
    email: {type: 'string'},
    name: {type: 'string'},
  },
};


@model()
export class NewUserRequest extends User {
  @property({
    type: 'string',
    required: true,
  })
  password: string;
}

const CredentialsSchema: SchemaObject = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 8,
    },
  },
};

const CredentialsNacionalSchema: SchemaObject = {
  type: 'object',
  required: ['rut', 'password'],
  properties: {
    rut: {
      type: 'string'
    },
    password: {
      type: 'string',
      minLength: 8,
    },
  },
};

export const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: CredentialsSchema},
  },
};

export const CredentialsNacionalRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: CredentialsNacionalSchema},
  },
};

export class SecurityController {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
    @repository(UserCredentialsRepository) public userCredentialsRepository: UserCredentialsRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: UserService<User, Credentials>,
    @inject('services.EmailService')
    public emailService: EmailService,

  ) {
  }

  @post('/api/security/sign-up', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  async create(
    @requestBody(CredentialsRequestBody) newUserRequest: Credentials,
  ): Promise<User> {
    newUserRequest.role = 'user';

    // ensure a valid email value and password value
    validateCredentials(_.pick(newUserRequest, ['email', 'password']));

    // encrypt the password
    const password = await this.passwordHasher.hashPassword(
      newUserRequest.password,
    );

    const isUniqueUser = await this.userRepository.findOne({where: {email: newUserRequest.email}});

    if (isUniqueUser !== null) {
      throw new HttpErrors.BadRequest('Email value is already taken');
    }


    try {
      // create the new user
      const savedUser = await this.userRepository.create(
        _.omit(newUserRequest, 'password'),
      );

      // set the password
      await this.userRepository
        .userCredentials(savedUser.id)
        .create({password});

      // Send an email to the user's email address

      let myuuid = uuidv4();
      savedUser.enableKey = myuuid;
      savedUser.activate = false;

      try {
        // Updates the user to store their reset key with error handling
        await this.userRepository.updateById(savedUser.id, savedUser);
      } catch (e) {
        return e;
      }

      var htmlWelcome = renderWelcome(savedUser.enableKey);

      const nodeMailer: SMTPTransport.SentMessageInfo = await this.emailService.sendResetPasswordMail(
        savedUser, htmlWelcome, '[Equipo Offix] Registro de usuario'
      );

      // Nodemailer has accepted the request. All good
      if (nodeMailer.accepted.length) {
        return savedUser;
      }

      // Nodemailer did not complete the request alert the user
      throw new HttpErrors.InternalServerError(
        'Error sending reset password email',
      );

    } catch (error) {
      // MongoError 11000 duplicate key
      if (error.code === 11000 && error.errmsg.includes('index: uniqueEmail')) {
        throw new HttpErrors.Conflict('Email value is already taken');
      } else {
        throw error;
      }
    }
  }

  @post('/api/security/sign-up/admin', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  async createadmin(
    @requestBody(CredentialsRequestBody) newUserRequest: Credentials,
  ): Promise<User> {
    // All new users have the "customer" role by default
    newUserRequest.role = 'admin';
    // ensure a valid email value and password value
    validateCredentials(_.pick(newUserRequest, ['email', 'password']));

    // encrypt the password
    const password = await this.passwordHasher.hashPassword(
      newUserRequest.password,
    );

    try {
      // create the new user
      const savedUser = await this.userRepository.create(
        _.omit(newUserRequest, 'password'),
      );

      // set the password
      await this.userRepository
        .userCredentials(savedUser.id)
        .create({password});

      return savedUser;
    } catch (error) {
      // MongoError 11000 duplicate key
      if (error.code === 11000 && error.errmsg.includes('index: uniqueEmail')) {
        throw new HttpErrors.Conflict('Email value is already taken');
      } else {
        throw error;
      }
    }
  }

  @get('/api/security/{userId}', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async findById(@param.path.string('userId') userId: string): Promise<User> {
    return this.userRepository.findById(userId);
  }

  @get('/api/security/me', {
    responses: {
      '200': {
        description: 'The current user profile',
        content: {
          'application/json': {
            schema: UserProfileSchema,
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async printCurrentUser(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<User> {

    const userId = currentUserProfile[securityId];
    return this.userRepository.findById(userId);
  }

  @post('/api/security/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{token: string, user: User}> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);

    if (!user.activate) {
      throw new HttpErrors.BadRequest('User not activated');
    }

    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);

    return {token, user};
  }

  @post('/api/security/sign-up/bussines', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  async createbussines(
    @requestBody(CredentialsRequestBody) newUserRequest: Credentials,
  ): Promise<User> {
    newUserRequest.role = 'bussines';

    // ensure a valid email value and password value
    validateCredentials(_.pick(newUserRequest, ['email', 'password']));

    // encrypt the password
    const password = await this.passwordHasher.hashPassword(
      newUserRequest.password,
    );

    const isUniqueUser = await this.userRepository.findOne({where: {email: newUserRequest.email}});

    if (isUniqueUser !== null) {
      throw new HttpErrors.BadRequest('Email value is already taken');
    }


    try {
      // create the new user
      const savedUser = await this.userRepository.create(
        _.omit(newUserRequest, 'password'),
      );

      // set the password
      await this.userRepository
        .userCredentials(savedUser.id)
        .create({password});

      return savedUser;
    } catch (error) {
      // MongoError 11000 duplicate key
      if (error.code === 11000 && error.errmsg.includes('index: uniqueEmail')) {
        throw new HttpErrors.Conflict('Email value is already taken');
      } else {
        throw error;
      }
    }
  }

  @post('/api/security/reset-password/init')
  async resetPasswordInit(
    @requestBody() resetPasswordInit: ResetPasswordInit,
  ): Promise<{email: string}> {
    // checks whether email is valid as per regex pattern provided
    const email = await this.validateEmail(resetPasswordInit.email);

    // At this point we are dealing with valid email.
    // Lets check whether there is an associated account
    const foundUser = await this.userRepository.findOne({
      where: {email},
    });

    // No account found
    if (!foundUser) {
      throw new HttpErrors.NotFound(
        'No account associated with the provided email address.',
      );
    }

    // We generate unique reset key to associate with reset request
    foundUser.resetKey = Math.floor(1000 + Math.random() * 9000).toString();

    try {
      // Updates the user to store their reset key with error handling
      await this.userRepository.updateById(foundUser.id, foundUser);
    } catch (e) {
      return e;
    }
    // Send an email to the user's email address

    var htmlResetPassword = renderCode(foundUser.resetKey);

    const nodeMailer: SMTPTransport.SentMessageInfo = await this.emailService.sendResetPasswordMail(
      foundUser, htmlResetPassword, '[Offix] Reiniciar contrasenna'
    );

    // Nodemailer has accepted the request. All good
    if (nodeMailer.accepted.length) {
      return {email: foundUser.email};
    }

    // Nodemailer did not complete the request alert the user
    throw new HttpErrors.InternalServerError(
      'Error sending reset password email',
    );
  }

  @post('/api/security/reset-password/finish')
  async resetPasswordFinish(
    @requestBody() keyAndPassword: KeyAndPassword,
  ): Promise<User> {
    // Checks whether password and reset key meet minimum security requirements
    const {resetKey, password} = await this.validateKeyPassword(keyAndPassword);

    // Search for a user using reset key
    const foundUser = await this.userRepository.findOne({
      where: {resetKey: resetKey},
    });

    // No user account found
    if (!foundUser) {
      throw new HttpErrors.NotFound(
        'No associated account for the provided reset key',
      );
    }

    // Encrypt password to avoid storing it as plain text
    const passwordHash = await hash(password, await genSalt());

    try {
      // Update user password with the newly provided password
      await this.userRepository
        .userCredentials(foundUser.id)
        .patch({password: passwordHash});

      // Remove reset key from database its no longer valid
      foundUser.resetKey = '';

      // Update the user removing the reset key
      await this.userRepository.updateById(foundUser.id, foundUser);
    } catch (e) {
      return e;
    }

    return foundUser;
  }


  @get('/api/security/activate/user/{key}', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  async activateUser(
    @param.path.string('key') key: string,
  ): Promise<User> {
    const foundUser = await this.userRepository.findOne({
      where: {enableKey: key},
    });

    // No account found
    if (!foundUser) {
      throw new HttpErrors.NotFound(
        'No account associated with the provided email address.',
      );
    }

    foundUser.activate = true;

    try {
      // Updates the user to store their reset key with error handling
      await this.userRepository.updateById(foundUser.id, foundUser);
    } catch (e) {
      return e;
    }

    return foundUser;


  }

  async validateKeyPassword(keyAndPassword: KeyAndPassword): Promise<KeyAndPassword> {
    if (!keyAndPassword.password || keyAndPassword.password.length < 8) {
      throw new HttpErrors.UnprocessableEntity(
        'Password must be minimum of 8 characters',
      );
    }

    if (keyAndPassword.password !== keyAndPassword.confirmPassword) {
      throw new HttpErrors.UnprocessableEntity(
        'Password and confirmation password do not match',
      );
    }

    if (
      _.isEmpty(keyAndPassword.resetKey) ||
      keyAndPassword.resetKey.length === 0 ||
      keyAndPassword.resetKey.trim() === ''
    ) {
      throw new HttpErrors.UnprocessableEntity('Reset key is mandatory');
    }

    return keyAndPassword;
  }

  async validateEmail(email: string): Promise<string> {
    const emailRegPattern = /\S+@\S+\.\S+/;
    if (!emailRegPattern.test(email)) {
      throw new HttpErrors.UnprocessableEntity('Invalid email address');
    }
    return email;
  }


}
