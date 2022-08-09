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
  Atribute, Product
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductAtributeController {
  constructor(
    @repository(ProductRepository) protected productRepository: ProductRepository,
  ) { }

  @get('/api/products/{id}/atributes', {
    responses: {
      '200': {
        description: 'Array of Product has many Atribute through ProductAttributeRelation',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Atribute)},
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
    @param.query.object('filter') filter?: Filter<Atribute>,
  ): Promise<Atribute[]> {
    return this.productRepository.atributes(id).find(filter);
  }

  @post('/api/products/{id}/atributes', {
    responses: {
      '200': {
        description: 'create a Atribute model instance',
        content: {'application/json': {schema: getModelSchemaRef(Atribute)}},
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
          schema: getModelSchemaRef(Atribute, {
            title: 'NewAtributeInProduct',
            exclude: ['id'],
          }),
        },
      },
    }) atribute: Omit<Atribute, 'id'>,
  ): Promise<Atribute> {
    return this.productRepository.atributes(id).create(atribute);
  }

  @patch('/api/products/{id}/atributes', {
    responses: {
      '200': {
        description: 'Product.Atribute PATCH success count',
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
          schema: getModelSchemaRef(Atribute, {partial: true}),
        },
      },
    })
    atribute: Partial<Atribute>,
    @param.query.object('where', getWhereSchemaFor(Atribute)) where?: Where<Atribute>,
  ): Promise<Count> {
    return this.productRepository.atributes(id).patch(atribute, where);
  }

  @del('/api/products/{id}/atributes', {
    responses: {
      '200': {
        description: 'Product.Atribute DELETE success count',
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
    @param.query.object('where', getWhereSchemaFor(Atribute)) where?: Where<Atribute>,
  ): Promise<Count> {
    return this.productRepository.atributes(id).delete(where);
  }
}
