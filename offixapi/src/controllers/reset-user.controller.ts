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
  Reset,
  User
} from '../models';
import {ResetRepository} from '../repositories';

export class ResetUserController {
  constructor(
    @repository(ResetRepository)
    public resetRepository: ResetRepository,
  ) { }

  @get('/api/resets/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Reset',
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
    @param.path.string('id') id: typeof Reset.prototype.id,
  ): Promise<User> {
    return this.resetRepository.owner(id);
  }
}
