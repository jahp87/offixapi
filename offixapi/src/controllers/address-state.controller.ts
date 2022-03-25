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
  State
} from '../models';
import {AddressRepository} from '../repositories';

export class AddressStateController {
  constructor(
    @repository(AddressRepository)
    public addressRepository: AddressRepository,
  ) { }

  @get('/api/addresses/{id}/state', {
    responses: {
      '200': {
        description: 'State belonging to Address',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(State)},
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
  async getState(
    @param.path.string('id') id: typeof Address.prototype.id,
  ): Promise<State> {
    return this.addressRepository.state(id);
  }
}
