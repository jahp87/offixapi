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
import {ProductCategoryRelation} from '../models';
import {ProductCategoryRelationRepository} from '../repositories';

export class ProductCategoryRelationController {
  constructor(
    @repository(ProductCategoryRelationRepository)
    public productCategoryRelationRepository: ProductCategoryRelationRepository,
  ) { }

  @post('/api/productcategoryrelation')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'ProductCategoryRelation model instance',
    content: {'application/json': {schema: getModelSchemaRef(ProductCategoryRelation)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductCategoryRelation, {
            title: 'NewProductCategoryRelation',
            exclude: ['id'],
          }),
        },
      },
    })
    productCategoryRelation: Omit<ProductCategoryRelation, 'id'>,
  ): Promise<ProductCategoryRelation> {
    return this.productCategoryRelationRepository.create(productCategoryRelation);
  }

  @get('/api/productcategoryrelation/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'ProductCategoryRelation model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ProductCategoryRelation) where?: Where<ProductCategoryRelation>,
  ): Promise<Count> {
    return this.productCategoryRelationRepository.count(where);
  }

  @get('/api/productcategoryrelation')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of ProductCategoryRelation model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ProductCategoryRelation, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ProductCategoryRelation) filter?: Filter<ProductCategoryRelation>,
  ): Promise<ProductCategoryRelation[]> {
    return this.productCategoryRelationRepository.find(filter);
  }

  @patch('/api/productcategoryrelation')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'ProductCategoryRelation PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductCategoryRelation, {partial: true}),
        },
      },
    })
    productCategoryRelation: ProductCategoryRelation,
    @param.where(ProductCategoryRelation) where?: Where<ProductCategoryRelation>,
  ): Promise<Count> {
    return this.productCategoryRelationRepository.updateAll(productCategoryRelation, where);
  }

  @get('/api/productcategoryrelation/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'ProductCategoryRelation model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ProductCategoryRelation, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ProductCategoryRelation, {exclude: 'where'}) filter?: FilterExcludingWhere<ProductCategoryRelation>
  ): Promise<ProductCategoryRelation> {
    return this.productCategoryRelationRepository.findById(id, filter);
  }

  @patch('/api/productcategoryrelation/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'ProductCategoryRelation PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductCategoryRelation, {partial: true}),
        },
      },
    })
    productCategoryRelation: ProductCategoryRelation,
  ): Promise<void> {
    await this.productCategoryRelationRepository.updateById(id, productCategoryRelation);
  }

  @put('/api/productcategoryrelation/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'ProductCategoryRelation PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() productCategoryRelation: ProductCategoryRelation,
  ): Promise<void> {
    await this.productCategoryRelationRepository.replaceById(id, productCategoryRelation);
  }

  @del('/api/productcategoryrelation/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'ProductCategoryRelation DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.productCategoryRelationRepository.deleteById(id);
  }
}
