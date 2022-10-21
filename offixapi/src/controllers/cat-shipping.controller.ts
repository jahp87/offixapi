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
import {CatShipping} from '../models';
import {CatShippingRepository} from '../repositories';

export class CatShippingController {
  constructor(
    @repository(CatShippingRepository)
    public catShippingRepository : CatShippingRepository,
  ) {}

  @post('/api/catshippings')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'CatShipping model instance',
    content: {'application/json': {schema: getModelSchemaRef(CatShipping)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CatShipping, {
            title: 'NewCatShipping',
            exclude: ['id'],
          }),
        },
      },
    })
    catShipping: Omit<CatShipping, 'id'>,
  ): Promise<CatShipping> {
    return this.catShippingRepository.create(catShipping);
  }

  @get('/api/catshippings/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'CatShipping model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CatShipping) where?: Where<CatShipping>,
  ): Promise<Count> {
    return this.catShippingRepository.count(where);
  }

  @get('/api/catshippings')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of CatShipping model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CatShipping, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CatShipping) filter?: Filter<CatShipping>,
  ): Promise<CatShipping[]> {
    return this.catShippingRepository.find(filter);
  }

  @patch('/api/catshippings')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'CatShipping PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CatShipping, {partial: true}),
        },
      },
    })
    catShipping: CatShipping,
    @param.where(CatShipping) where?: Where<CatShipping>,
  ): Promise<Count> {
    return this.catShippingRepository.updateAll(catShipping, where);
  }

  @get('/api/catshippings/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'CatShipping model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CatShipping, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CatShipping, {exclude: 'where'}) filter?: FilterExcludingWhere<CatShipping>
  ): Promise<CatShipping> {
    return this.catShippingRepository.findById(id, filter);
  }

  @patch('/api/catshippings/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'CatShipping PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CatShipping, {partial: true}),
        },
      },
    })
    catShipping: CatShipping,
  ): Promise<void> {
    await this.catShippingRepository.updateById(id, catShipping);
  }

  @put('/api/catshippings/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'CatShipping PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() catShipping: CatShipping,
  ): Promise<void> {
    await this.catShippingRepository.replaceById(id, catShipping);
  }

  @del('/api/catshippings/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'CatShipping DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.catShippingRepository.deleteById(id);
  }
}
