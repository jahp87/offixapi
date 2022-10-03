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
  Product, SellOrderDetails
} from '../models';
import {SellOrderDetailsRepository} from '../repositories';

export class SellOrderDetailsProductController {
  constructor(
    @repository(SellOrderDetailsRepository)
    public sellOrderDetailsRepository: SellOrderDetailsRepository,
  ) { }

  @get('/api/sellorderdetails/{id}/product', {
    responses: {
      '200': {
        description: 'Product belonging to SellOrderDetails',
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
    @param.path.string('id') id: typeof SellOrderDetails.prototype.id,
  ): Promise<Product> {
    return this.sellOrderDetailsRepository.product(id);
  }
}
