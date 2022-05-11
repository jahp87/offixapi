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
  Service
} from '../models';
import {OrderServiceRepository} from '../repositories';

export class OrderServiceServiceController {
  constructor(
    @repository(OrderServiceRepository)
    public orderServiceRepository: OrderServiceRepository,
  ) { }

  @get('/api/orderservices/{id}/service', {
    responses: {
      '200': {
        description: 'Service belonging to OrderService',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Service)},
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
  async getService(
    @param.path.string('id') id: typeof OrderService.prototype.id,
  ): Promise<Service> {
    return this.orderServiceRepository.service(id);
  }
}
