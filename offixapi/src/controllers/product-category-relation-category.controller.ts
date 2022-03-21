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
  Category, ProductCategoryRelation
} from '../models';
import {ProductCategoryRelationRepository} from '../repositories';

export class ProductCategoryRelationCategoryController {
  constructor(
    @repository(ProductCategoryRelationRepository)
    public productCategoryRelationRepository: ProductCategoryRelationRepository,
  ) { }

  @get('/api/product-category-relations/{id}/category', {
    responses: {
      '200': {
        description: 'Category belonging to ProductCategoryRelation',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Category)},
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
  async getCategory(
    @param.path.string('id') id: typeof ProductCategoryRelation.prototype.id,
  ): Promise<Category> {
    return this.productCategoryRelationRepository.category(id);
  }
}
