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
  City, Profile
} from '../models';
import {ProfileRepository} from '../repositories';

export class ProfileCityController {
  constructor(
    @repository(ProfileRepository)
    public profileRepository: ProfileRepository,
  ) { }

  @get('/api/profiles/{id}/city', {
    responses: {
      '200': {
        description: 'City belonging to Profile',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(City)},
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
  async getCity(
    @param.path.string('id') id: typeof Profile.prototype.id,
  ): Promise<City> {
    return this.profileRepository.city(id);
  }
}
