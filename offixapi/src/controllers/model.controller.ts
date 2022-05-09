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
import {Model} from '../models';
import {ModelRepository} from '../repositories';

export class ModelController {
  constructor(
    @repository(ModelRepository)
    public modelRepository: ModelRepository,
  ) { }

  @post('/api/models')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Model model instance',
    content: {'application/json': {schema: getModelSchemaRef(Model)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Model, {
            title: 'NewModel',
            exclude: ['id'],
          }),
        },
      },
    })
    model: Omit<Model, 'id'>,
  ): Promise<Model> {
    return this.modelRepository.create(model);
  }

  @get('/api/models/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Model model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Model) where?: Where<Model>,
  ): Promise<Count> {
    return this.modelRepository.count(where);
  }

  @get('/api/models')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of Model model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Model, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Model) filter?: Filter<Model>,
  ): Promise<Model[]> {
    return this.modelRepository.find(filter);
  }

  @patch('/api/models')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Model PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Model, {partial: true}),
        },
      },
    })
    model: Model,
    @param.where(Model) where?: Where<Model>,
  ): Promise<Count> {
    return this.modelRepository.updateAll(model, where);
  }

  @get('/api/models/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Model model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Model, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Model, {exclude: 'where'}) filter?: FilterExcludingWhere<Model>
  ): Promise<Model> {
    return this.modelRepository.findById(id, filter);
  }

  @patch('/api/models/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Model PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Model, {partial: true}),
        },
      },
    })
    model: Model,
  ): Promise<void> {
    await this.modelRepository.updateById(id, model);
  }

  @put('/api/models/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Model PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() model: Model,
  ): Promise<void> {
    await this.modelRepository.replaceById(id, model);
  }

  @del('/api/models/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Model DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.modelRepository.deleteById(id);
  }

  @get('/api/models/fulldata')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of Model model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Model, {includeRelations: true}),
        },
      },
    },
  })
  async fulldata(
  ): Promise<Model[]> {
    return this.modelRepository.fulldata();
  }

  @get('/api/models/fulldata/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Model model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Model, {includeRelations: true}),
      },
    },
  })
  async fulldataById(
    @param.path.string('id') id: string,
  ): Promise<Model> {
    return this.modelRepository.fulldataById(id);
  }
}
