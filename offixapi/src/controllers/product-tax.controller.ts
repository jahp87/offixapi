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
  Product, Tax
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductTaxController {
  constructor(
    @repository(ProductRepository) protected productRepository: ProductRepository,
  ) { }

  @get('/api/products/{id}/taxes', {
    responses: {
      '200': {
        description: 'Array of Product has many Tax through ProductTaxRelation',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tax)},
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
    @param.query.object('filter') filter?: Filter<Tax>,
  ): Promise<Tax[]> {
    return this.productRepository.taxes(id).find(filter);
  }

  @post('/api/products/{id}/taxes', {
    responses: {
      '200': {
        description: 'create a Tax model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tax)}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async create(
    @param.path.string('id') id: typeof Product.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tax, {
            title: 'NewTaxInProduct',
            exclude: ['id'],
          }),
        },
      },
    }) tax: Omit<Tax, 'id'>,
  ): Promise<Tax> {
    return this.productRepository.taxes(id).create(tax);
  }

  @patch('/api/products/{id}/taxes', {
    responses: {
      '200': {
        description: 'Product.Tax PATCH success count',
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
          schema: getModelSchemaRef(Tax, {partial: true}),
        },
      },
    })
    tax: Partial<Tax>,
    @param.query.object('where', getWhereSchemaFor(Tax)) where?: Where<Tax>,
  ): Promise<Count> {
    return this.productRepository.taxes(id).patch(tax, where);
  }

  @del('/api/products/{id}/taxes', {
    responses: {
      '200': {
        description: 'Product.Tax DELETE success count',
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
    @param.query.object('where', getWhereSchemaFor(Tax)) where?: Where<Tax>,
  ): Promise<Count> {
    return this.productRepository.taxes(id).delete(where);
  }
}
