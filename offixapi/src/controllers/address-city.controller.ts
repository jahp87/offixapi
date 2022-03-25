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
  City
} from '../models';
import {AddressRepository} from '../repositories';

export class AddressCityController {
  constructor(
    @repository(AddressRepository)
    public addressRepository: AddressRepository,
  ) { }

  @get('/api/addresses/{id}/city', {
    responses: {
      '200': {
        description: 'City belonging to Address',
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
    @param.path.string('id') id: typeof Address.prototype.id,
  ): Promise<City> {
    return this.addressRepository.city(id);
  }
}
