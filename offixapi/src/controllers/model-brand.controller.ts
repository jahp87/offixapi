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
  Brand, Model
} from '../models';
import {ModelRepository} from '../repositories';

export class ModelBrandController {
  constructor(
    @repository(ModelRepository)
    public modelRepository: ModelRepository,
  ) { }

  @get('/api/models/{id}/brand', {
    responses: {
      '200': {
        description: 'Brand belonging to Model',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Brand)},
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
  async getBrand(
    @param.path.string('id') id: typeof Model.prototype.id,
  ): Promise<Brand> {
    return this.modelRepository.brand(id);
  }
}
