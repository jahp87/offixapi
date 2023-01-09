import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {
  repository,
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
} from '@loopback/rest';
import {basicAuthorization} from '../middlewares/auth.midd';
import {
  Brand,
  Reset,
} from '../models';
import {ResetRepository} from '../repositories';

export class ResetBrandController {
  constructor(
    @repository(ResetRepository)
    public resetRepository: ResetRepository,
  ) { }

  @get('/resets/{id}/brand', {
    responses: {
      '200': {
        description: 'Brand belonging to Reset',
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
    @param.path.string('id') id: typeof Reset.prototype.id,
  ): Promise<Brand> {
    return this.resetRepository.brand(id);
  }
}
