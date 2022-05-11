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
  OrderReset,
  Reset
} from '../models';
import {OrderResetRepository} from '../repositories';

export class OrderResetResetController {
  constructor(
    @repository(OrderResetRepository)
    public orderResetRepository: OrderResetRepository,
  ) { }

  @get('/api/orderresets/{id}/reset', {
    responses: {
      '200': {
        description: 'Reset belonging to OrderReset',
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
    @param.path.string('id') id: typeof OrderReset.prototype.id,
  ): Promise<Reset> {
    return this.orderResetRepository.reset(id);
  }
}
