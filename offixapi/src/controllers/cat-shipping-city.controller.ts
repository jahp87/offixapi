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
  CatShipping,
  City
} from '../models';
import {CatShippingRepository} from '../repositories';

export class CatShippingCityController {
  constructor(
    @repository(CatShippingRepository)
    public catShippingRepository: CatShippingRepository,
  ) { }

  @get('/api/catshippings/{id}/city', {
    responses: {
      '200': {
        description: 'City belonging to CatShipping',
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
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  async getCity(
    @param.path.string('id') id: typeof CatShipping.prototype.id,
  ): Promise<City> {
    return this.catShippingRepository.city(id);
  }
}
