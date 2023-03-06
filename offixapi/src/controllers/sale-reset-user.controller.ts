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
  SaleReset,
  User,
} from '../models';
import {SaleResetRepository} from '../repositories';

export class SaleResetUserController {
  constructor(
    @repository(SaleResetRepository)
    public saleResetRepository: SaleResetRepository,
  ) { }

  @get('/api/sale-resets/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to SaleReset',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
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
  async getUser(
    @param.path.string('id') id: typeof SaleReset.prototype.id,
  ): Promise<User> {
    return this.saleResetRepository.buyer(id);
  }
}
