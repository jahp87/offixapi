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
  User
} from '../models';
import {AddressRepository} from '../repositories';

export class AddressUserController {
  constructor(
    @repository(AddressRepository)
    public addressRepository: AddressRepository,
  ) { }

  @get('/api/addresses/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Address',
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
    @param.path.string('id') id: typeof Address.prototype.id,
  ): Promise<User> {
    return this.addressRepository.user(id);
  }
}
