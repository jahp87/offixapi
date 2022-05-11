import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {basicAuthorization} from '../middlewares/auth.midd';
import {
  Service, TypeService
} from '../models';
import {TypeServiceRepository} from '../repositories';

export class TypeServiceServiceController {
  constructor(
    @repository(TypeServiceRepository) protected typeServiceRepository: TypeServiceRepository,
  ) { }

  @get('/api/typeservices/{id}/services', {
    responses: {
      '200': {
        description: 'Array of TypeService has many Service',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Service)},
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
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Service>,
  ): Promise<Service[]> {
    return this.typeServiceRepository.services(id).find(filter);
  }

  @post('/api/typeservices/{id}/services', {
    responses: {
      '200': {
        description: 'TypeService model instance',
        content: {'application/json': {schema: getModelSchemaRef(Service)}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async create(
    @param.path.string('id') id: typeof TypeService.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Service, {
            title: 'NewServiceInTypeService',
            exclude: ['id'],
            optional: ['typeServiceId']
          }),
        },
      },
    }) service: Omit<Service, 'id'>,
  ): Promise<Service> {
    return this.typeServiceRepository.services(id).create(service);
  }

  @patch('/api/typeservices/{id}/services', {
    responses: {
      '200': {
        description: 'TypeService.Service PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Service, {partial: true}),
        },
      },
    })
    service: Partial<Service>,
    @param.query.object('where', getWhereSchemaFor(Service)) where?: Where<Service>,
  ): Promise<Count> {
    return this.typeServiceRepository.services(id).patch(service, where);
  }

  @del('/api/typeservices/{id}/services', {
    responses: {
      '200': {
        description: 'TypeService.Service DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Service)) where?: Where<Service>,
  ): Promise<Count> {
    return this.typeServiceRepository.services(id).delete(where);
  }
}
