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
  Device, OrderService
} from '../models';
import {OrderServiceRepository} from '../repositories';

export class OrderServiceDeviceController {
  constructor(
    @repository(OrderServiceRepository)
    public orderServiceRepository: OrderServiceRepository,
  ) { }

  @get('/api/orderservices/{id}/device', {
    responses: {
      '200': {
        description: 'Device belonging to OrderService',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Device)},
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
  async getDevice(
    @param.path.string('id') id: typeof OrderService.prototype.id,
  ): Promise<Device> {
    return this.orderServiceRepository.device(id);
  }
}
