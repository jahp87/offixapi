import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {basicAuthorization} from '../middlewares/auth.midd';
import {TypeService} from '../models';
import {TypeServiceRepository} from '../repositories';

export class TypeServiceController {
  constructor(
    @repository(TypeServiceRepository)
    public typeServiceRepository: TypeServiceRepository,
  ) { }

  @post('/api/typeservices')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'TypeService model instance',
    content: {'application/json': {schema: getModelSchemaRef(TypeService)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TypeService, {
            title: 'NewTypeService',
            exclude: ['id'],
          }),
        },
      },
    })
    typeService: Omit<TypeService, 'id'>,
  ): Promise<TypeService> {
    return this.typeServiceRepository.create(typeService);
  }

  @get('/api/typeservices/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'TypeService model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TypeService) where?: Where<TypeService>,
  ): Promise<Count> {
    return this.typeServiceRepository.count(where);
  }

  @get('/api/typeservices')
  @response(200, {
    description: 'Array of TypeService model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TypeService, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TypeService) filter?: Filter<TypeService>,
  ): Promise<TypeService[]> {
    return this.typeServiceRepository.find(filter);
  }

  @patch('/api/typeservices')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'TypeService PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TypeService, {partial: true}),
        },
      },
    })
    typeService: TypeService,
    @param.where(TypeService) where?: Where<TypeService>,
  ): Promise<Count> {
    return this.typeServiceRepository.updateAll(typeService, where);
  }

  @get('/api/typeservices/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'TypeService model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TypeService, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TypeService, {exclude: 'where'}) filter?: FilterExcludingWhere<TypeService>
  ): Promise<TypeService> {
    return this.typeServiceRepository.findById(id, filter);
  }

  @patch('/api/typeservices/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'TypeService PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TypeService, {partial: true}),
        },
      },
    })
    typeService: TypeService,
  ): Promise<void> {
    await this.typeServiceRepository.updateById(id, typeService);
  }

  @put('/api/typeservices/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'TypeService PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() typeService: TypeService,
  ): Promise<void> {
    await this.typeServiceRepository.replaceById(id, typeService);
  }

  @del('/api/typeservices/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'TypeService DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.typeServiceRepository.deleteById(id);
  }

  @get('/api/typeservices/fulldata')
  @response(200, {
    description: 'Array of TypeService model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TypeService, {includeRelations: true}),
        },
      },
    },
  })
  async fulldata(
  ): Promise<TypeService[]> {
    return this.typeServiceRepository.fulldata();
  }

  @get('/api/typeservices/fulldata/{id}')
  @response(200, {
    description: 'TypeService model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TypeService, {includeRelations: true}),
      },
    },
  })
  async fulldataById(
    @param.path.string('id') id: string
  ): Promise<TypeService> {
    return this.typeServiceRepository.fulldataById(id);
  }
}
