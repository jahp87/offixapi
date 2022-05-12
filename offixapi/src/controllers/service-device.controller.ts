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
  Device, Service
} from '../models';
import {ServiceRepository} from '../repositories';

export class ServiceDeviceController {
  constructor(
    @repository(ServiceRepository)
    public serviceRepository: ServiceRepository,
  ) { }

  @get('/api/services/{id}/device', {
    responses: {
      '200': {
        description: 'Device belonging to Service',
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
    @param.path.string('id') id: typeof Service.prototype.id,
  ): Promise<Device> {
    return this.serviceRepository.device(id);
  }
}
