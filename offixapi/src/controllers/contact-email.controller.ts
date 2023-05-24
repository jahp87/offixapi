import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import {ContactEmail} from '../models';
import {ContactEmailRepository} from '../repositories';
import {EmailService} from '../services';
import {renderContact} from '../templates/htmltemplates';

export class ContactEmailController {
  constructor(
    @repository(ContactEmailRepository)
    public contactEmailRepository: ContactEmailRepository,
    @inject('services.EmailService')
    public emailService: EmailService,
  ) {}

  @post('/api/contactemails')
  @response(200, {
    description: 'ContactEmail model instance',
    content: {'application/json': {schema: getModelSchemaRef(ContactEmail)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContactEmail, {
            title: 'NewContactEmail',
            exclude: ['id'],
          }),
        },
      },
    })
    contactEmail: Omit<ContactEmail, 'id'>,
  ): Promise<ContactEmail> {
    return this.contactEmailRepository.create(contactEmail);
  }

  @get('/api/contactemails/count')
  @response(200, {
    description: 'ContactEmail model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ContactEmail) where?: Where<ContactEmail>,
  ): Promise<Count> {
    return this.contactEmailRepository.count(where);
  }

  @get('/api/contactemails')
  @response(200, {
    description: 'Array of ContactEmail model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ContactEmail, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ContactEmail) filter?: Filter<ContactEmail>,
  ): Promise<ContactEmail[]> {
    return this.contactEmailRepository.find(filter);
  }

  @patch('/api/contactemails')
  @response(200, {
    description: 'ContactEmail PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContactEmail, {partial: true}),
        },
      },
    })
    contactEmail: ContactEmail,
    @param.where(ContactEmail) where?: Where<ContactEmail>,
  ): Promise<Count> {
    return this.contactEmailRepository.updateAll(contactEmail, where);
  }

  @get('/api/contactemails/{id}')
  @response(200, {
    description: 'ContactEmail model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ContactEmail, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ContactEmail, {exclude: 'where'})
    filter?: FilterExcludingWhere<ContactEmail>,
  ): Promise<ContactEmail> {
    return this.contactEmailRepository.findById(id, filter);
  }

  @patch('/api/contactemails/{id}')
  @response(204, {
    description: 'ContactEmail PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContactEmail, {partial: true}),
        },
      },
    })
    contactEmail: ContactEmail,
  ): Promise<void> {
    await this.contactEmailRepository.updateById(id, contactEmail);
  }

  @put('/api/contactemails/{id}')
  @response(204, {
    description: 'ContactEmail PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() contactEmail: ContactEmail,
  ): Promise<void> {
    await this.contactEmailRepository.replaceById(id, contactEmail);
  }

  @del('/api/contactemails/{id}')
  @response(204, {
    description: 'ContactEmail DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.contactEmailRepository.deleteById(id);
  }

  @post('/api/contactemails/sendemail')
  @response(200, {
    description: 'ContactEmail model instance',
    content: {'application/json': {schema: getModelSchemaRef(ContactEmail)}},
  })
  async sendemail(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContactEmail, {
            title: 'NewContactEmail',
            exclude: ['id'],
          }),
        },
      },
    })
    contactEmail: Omit<ContactEmail, 'id'>,
  ): Promise<ContactEmail | undefined> {
    const contactEmailObject = await this.contactEmailRepository.create(
      contactEmail,
    );
    //send email

    const htmlContactMessage = renderContact(
      contactEmailObject.name,
      contactEmailObject.email,
      contactEmailObject.body,
    );

    const nodeMailer: SMTPTransport.SentMessageInfo =
      await this.emailService.sendContactMessage(
        htmlContactMessage,
        'Correo de contacto',
      );

    // eslint-disable-next-line no-useless-catch
    try {
      // Nodemailer has accepted the request. All good
      if (nodeMailer.accepted.length) {
        return contactEmailObject;
      }

      // Nodemailer did not complete the request alert the user
      throw new HttpErrors.InternalServerError('Error sending contact message');
    } catch (error) {
      throw error;
    }
  }
}
