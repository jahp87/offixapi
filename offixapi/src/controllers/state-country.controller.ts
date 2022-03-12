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
  Country, State
} from '../models';
import {StateRepository} from '../repositories';

export class StateCountryController {
  constructor(
    @repository(StateRepository)
    public stateRepository: StateRepository,
  ) { }

  @get('/api/states/{id}/country', {
    responses: {
      '200': {
        description: 'Country belonging to State',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Country)},
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
  async getCountry(
    @param.path.string('id') id: typeof State.prototype.id,
  ): Promise<Country> {
    return this.stateRepository.country(id);
  }
}
