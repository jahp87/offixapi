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
  Profile,
  State
} from '../models';
import {ProfileRepository} from '../repositories';

export class ProfileStateController {
  constructor(
    @repository(ProfileRepository)
    public profileRepository: ProfileRepository,
  ) { }

  @get('/api/profiles/{id}/state', {
    responses: {
      '200': {
        description: 'State belonging to Profile',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(State)},
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
  async getState(
    @param.path.string('id') id: typeof Profile.prototype.id,
  ): Promise<State> {
    return this.profileRepository.state(id);
  }
}
