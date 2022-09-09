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
  Brand, Product
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductBrandController {
  constructor(
    @repository(ProductRepository)
    public productRepository: ProductRepository,
  ) { }

  @get('/api/products/{id}/brand', {
    responses: {
      '200': {
        description: 'Brand belonging to Product',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Brand)},
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
  async getBrand(
    @param.path.string('id') id: typeof Product.prototype.id,
  ): Promise<Brand> {
    return this.productRepository.brand(id);
  }
}
