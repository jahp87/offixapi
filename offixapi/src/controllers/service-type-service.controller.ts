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
  Service,
  TypeService
} from '../models';
import {ServiceRepository} from '../repositories';

export class ServiceTypeServiceController {
  constructor(
    @repository(ServiceRepository)
    public serviceRepository: ServiceRepository,
  ) { }

  @get('/api/services/{id}/typeservice', {
    responses: {
      '200': {
        description: 'TypeService belonging to Service',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TypeService)},
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
  async getTypeService(
    @param.path.string('id') id: typeof Service.prototype.id,
  ): Promise<TypeService> {
    return this.serviceRepository.typeService(id);
  }
}
