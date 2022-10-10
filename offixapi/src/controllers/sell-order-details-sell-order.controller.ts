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
  SellOrder, SellOrderDetails
} from '../models';
import {SellOrderDetailsRepository} from '../repositories';

export class SellOrderDetailsSellOrderController {
  constructor(
    @repository(SellOrderDetailsRepository)
    public sellOrderDetailsRepository: SellOrderDetailsRepository,
  ) { }

  @get('/api/sellorderdetails/{id}/sellorder', {
    responses: {
      '200': {
        description: 'SellOrder belonging to SellOrderDetails',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SellOrder)},
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
  async getSellOrder(
    @param.path.string('id') id: typeof SellOrderDetails.prototype.id,
  ): Promise<SellOrder> {
    return this.sellOrderDetailsRepository.sellOrder(id);
  }
}
