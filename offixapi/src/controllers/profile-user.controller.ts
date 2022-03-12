import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {basicAuthorization} from '../middlewares/auth.midd';
import {
  Profile,
  User
} from '../models';
import {ProfileRepository} from '../repositories';

export class ProfileUserController {
  constructor(
    @repository(ProfileRepository)
    public profileRepository: ProfileRepository,
  ) { }

  @get('/api/profiles/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Profile',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
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
  async getUser(
    @param.path.string('id') id: typeof Profile.prototype.id,
  ): Promise<User> {
    return this.profileRepository.user(id);
  }
}
