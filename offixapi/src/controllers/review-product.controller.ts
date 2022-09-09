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
  Product, Review
} from '../models';
import {ReviewRepository} from '../repositories';

export class ReviewProductController {
  constructor(
    @repository(ReviewRepository)
    public reviewRepository: ReviewRepository,
  ) { }

  @get('/api/reviews/{id}/product', {
    responses: {
      '200': {
        description: 'Product belonging to Review',
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
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  async getProduct(
    @param.path.string('id') id: typeof Review.prototype.id,
  ): Promise<Product> {
    return this.reviewRepository.product(id);
  }
}
