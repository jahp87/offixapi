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
  SellOrder,
  User
} from '../models';
import {SellOrderRepository} from '../repositories';

export class SellOrderUserController {
  constructor(
    @repository(SellOrderRepository)
    public sellOrderRepository: SellOrderRepository,
  ) { }

  @get('/api/sellorders/{id}/client', {
    responses: {
      '200': {
        description: 'User belonging to SellOrder',
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
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async getUser(
    @param.path.string('id') id: typeof SellOrder.prototype.id,
  ): Promise<User> {
    return this.sellOrderRepository.client(id);
  }
}
