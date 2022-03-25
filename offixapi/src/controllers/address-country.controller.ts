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
  Address,
  Country
} from '../models';
import {AddressRepository} from '../repositories';

export class AddressCountryController {
  constructor(
    @repository(AddressRepository)
    public addressRepository: AddressRepository,
  ) { }

  @get('/api/addresses/{id}/country', {
    responses: {
      '200': {
        description: 'Country belonging to Address',
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
    @param.path.string('id') id: typeof Address.prototype.id,
  ): Promise<Country> {
    return this.addressRepository.country(id);
  }
}
