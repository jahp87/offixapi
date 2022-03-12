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
  City,
  State
} from '../models';
import {CityRepository} from '../repositories';

export class CityStateController {
  constructor(
    @repository(CityRepository)
    public cityRepository: CityRepository,
  ) { }

  @get('/api/cities/{id}/state', {
    responses: {
      '200': {
        description: 'State belonging to City',
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
    @param.path.string('id') id: typeof City.prototype.id,
  ): Promise<State> {
    return this.cityRepository.state(id);
  }
}
