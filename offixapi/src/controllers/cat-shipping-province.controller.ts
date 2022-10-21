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
  Province
} from '../models';
import {CatShippingRepository} from '../repositories';

export class CatShippingProvinceController {
  constructor(
    @repository(CatShippingRepository)
    public catShippingRepository: CatShippingRepository,
  ) { }

  @get('/api/catshippings/{id}/province', {
    responses: {
      '200': {
        description: 'Province belonging to CatShipping',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Province)},
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
  async getProvince(
    @param.path.string('id') id: typeof CatShipping.prototype.id,
  ): Promise<Province> {
    return this.catShippingRepository.province(id);
  }
}
