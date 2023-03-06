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
  Reset,
  SaleReset,
} from '../models';
import {SaleResetRepository} from '../repositories';

export class SaleResetResetController {
  constructor(
    @repository(SaleResetRepository)
    public saleResetRepository: SaleResetRepository,
  ) { }

  @get('/api/sale-resets/{id}/reset', {
    responses: {
      '200': {
        description: 'Reset belonging to SaleReset',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Reset)},
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
  async getReset(
    @param.path.string('id') id: typeof SaleReset.prototype.id,
  ): Promise<Reset> {
    return this.saleResetRepository.reset(id);
  }
}
