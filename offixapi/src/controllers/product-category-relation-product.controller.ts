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
  Product, ProductCategoryRelation
} from '../models';
import {ProductCategoryRelationRepository} from '../repositories';

export class ProductCategoryRelationProductController {
  constructor(
    @repository(ProductCategoryRelationRepository)
    public productCategoryRelationRepository: ProductCategoryRelationRepository,
  ) { }

  @get('/api/product-category-relations/{id}/product', {
    responses: {
      '200': {
        description: 'Product belonging to ProductCategoryRelation',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Product)},
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
  async getProduct(
    @param.path.string('id') id: typeof ProductCategoryRelation.prototype.id,
  ): Promise<Product> {
    return this.productCategoryRelationRepository.product(id);
  }
}
