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
  OrderService,
  OrderServiceStatus
} from '../models';
import {OrderServiceRepository} from '../repositories';

export class OrderServiceOrderServiceStatusController {
  constructor(
    @repository(OrderServiceRepository)
    public orderServiceRepository: OrderServiceRepository,
  ) { }

  @get('/api/orderservices/{id}/orderservicestatus', {
    responses: {
      '200': {
        description: 'OrderServiceStatus belonging to OrderService',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(OrderServiceStatus)},
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
  async getOrderServiceStatus(
    @param.path.string('id') id: typeof OrderService.prototype.id,
  ): Promise<OrderServiceStatus> {
    return this.orderServiceRepository.orderServiceStatus(id);
  }
}
