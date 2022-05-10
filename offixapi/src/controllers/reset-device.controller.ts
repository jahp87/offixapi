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
  Device, Reset
} from '../models';
import {ResetRepository} from '../repositories';

export class ResetDeviceController {
  constructor(
    @repository(ResetRepository)
    public resetRepository: ResetRepository,
  ) { }

  @get('/api/resets/{id}/device', {
    responses: {
      '200': {
        description: 'Device belonging to Reset',
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
    @param.path.string('id') id: typeof Reset.prototype.id,
  ): Promise<Device> {
    return this.resetRepository.device(id);
  }
}
