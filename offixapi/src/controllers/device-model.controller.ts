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
  Device,
  Model
} from '../models';
import {DeviceRepository} from '../repositories';

export class DeviceModelController {
  constructor(
    @repository(DeviceRepository)
    public deviceRepository: DeviceRepository,
  ) { }

  @get('/devices/{id}/model', {
    responses: {
      '200': {
        description: 'Model belonging to Device',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Model)},
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
  async getModel(
    @param.path.string('id') id: typeof Device.prototype.id,
  ): Promise<Model> {
    return this.deviceRepository.model(id);
  }
}
