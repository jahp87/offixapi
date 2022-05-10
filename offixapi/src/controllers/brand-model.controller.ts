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
  Brand,
  Model
} from '../models';
import {BrandRepository} from '../repositories';

export class BrandModelController {
  constructor(
    @repository(BrandRepository) protected brandRepository: BrandRepository,
  ) { }

  @get('/api/brands/{id}/models', {
    responses: {
      '200': {
        description: 'Array of Brand has many Model',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Model)},
          },
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Model>,
  ): Promise<Model[]> {
    return this.brandRepository.models(id).find(filter);
  }

  @post('/api/brands/{id}/models', {
    responses: {
      '200': {
        description: 'Brand model instance',
        content: {'application/json': {schema: getModelSchemaRef(Model)}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  async create(
    @param.path.string('id') id: typeof Brand.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Model, {
            title: 'NewModelInBrand',
            exclude: ['id'],
            optional: ['brandId']
          }),
        },
      },
    }) model: Omit<Model, 'id'>,
  ): Promise<Model> {
    return this.brandRepository.models(id).create(model);
  }

  @patch('/api/brands/{id}/models', {
    responses: {
      '200': {
        description: 'Brand.Model PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Model, {partial: true}),
        },
      },
    })
    model: Partial<Model>,
    @param.query.object('where', getWhereSchemaFor(Model)) where?: Where<Model>,
  ): Promise<Count> {
    return this.brandRepository.models(id).patch(model, where);
  }

  @del('/api/brands/{id}/models', {
    responses: {
      '200': {
        description: 'Brand.Model DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Model)) where?: Where<Model>,
  ): Promise<Count> {
    return this.brandRepository.models(id).delete(where);
  }
}
