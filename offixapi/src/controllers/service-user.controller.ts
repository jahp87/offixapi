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
  User
} from '../models';
import {ServiceRepository} from '../repositories';

export class ServiceUserController {
  constructor(
    @repository(ServiceRepository)
    public serviceRepository: ServiceRepository,
  ) { }

  @get('/api/services/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Service',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
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
  async getUser(
    @param.path.string('id') id: typeof Service.prototype.id,
  ): Promise<User> {
    return this.serviceRepository.user(id);
  }
}
