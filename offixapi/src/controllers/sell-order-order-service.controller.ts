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
  OrderService, SellOrder
} from '../models';
import {SellOrderRepository} from '../repositories';

export class SellOrderOrderServiceController {
  constructor(
    @repository(SellOrderRepository)
    public sellOrderRepository: SellOrderRepository,
  ) { }

  @get('/api/sellorders/{id}/orderservice', {
    responses: {
      '200': {
        description: 'OrderService belonging to SellOrder',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(OrderService)},
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
  async getOrderService(
    @param.path.string('id') id: typeof SellOrder.prototype.id,
  ): Promise<OrderService> {
    return this.sellOrderRepository.order(id);
  }
}
