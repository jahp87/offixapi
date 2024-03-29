import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {basicAuthorization} from '../middlewares/auth.midd';
import {Address} from '../models';
import {AddressRepository} from '../repositories';

export class AddressController {
  constructor(
    @repository(AddressRepository)
    public addressRepository: AddressRepository,
  ) { }

  @post('/api/addresses')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Address model instance',
    content: {'application/json': {schema: getModelSchemaRef(Address)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Address, {
            title: 'NewAddress',
            exclude: ['id'],
          }),
        },
      },
    })
    address: Omit<Address, 'id'>,
  ): Promise<Address> {
    return this.addressRepository.create(address);
  }

  @response(200, {
    description: 'Address model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Address) where?: Where<Address>,
  ): Promise<Count> {
    return this.addressRepository.count(where);
  }

  @get('/api/addresses')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of Address model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Address, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Address) filter?: Filter<Address>,
  ): Promise<Address[]> {
    return this.addressRepository.find(filter);
  }

  @patch('/api/addresses')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Address PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Address, {partial: true}),
        },
      },
    })
    address: Address,
    @param.where(Address) where?: Where<Address>,
  ): Promise<Count> {
    return this.addressRepository.updateAll(address, where);
  }

  @get('/api/addresses/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Address model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Address, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Address, {exclude: 'where'}) filter?: FilterExcludingWhere<Address>
  ): Promise<Address> {
    return this.addressRepository.findById(id, filter);
  }

  @patch('/api/addresses/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Address PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Address, {partial: true}),
        },
      },
    })
    address: Address,
  ): Promise<void> {
    await this.addressRepository.updateById(id, address);
  }

  @put('/api/addresses/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Address PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() address: Address,
  ): Promise<void> {
    await this.addressRepository.replaceById(id, address);
  }

  @del('/api/addresses/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Address DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.addressRepository.deleteById(id);
  }

  @get('/api/addresses/fulldata')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of Address model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Address, {includeRelations: true}),
        },
      },
    },
  })
  async fulldata(
  ): Promise<Address[]> {
    return this.addressRepository.fulldata();
  }

  @get('/api/addresses/fulldata/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Address model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Address, {includeRelations: true}),
      },
    },
  })
  async fulldataById(
    @param.path.string('id') id: string,
  ): Promise<Address> {
    return this.addressRepository.fulldataById(id);
  }

  @get('/api/addresses/fulldatabyuser/{userId}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Address model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Address, {includeRelations: true}),
      },
    },
  })
  async fulldataByUser(
    @param.path.string('userId') userId: string,
  ): Promise<Address[]> {
    return this.addressRepository.fulldataByUser(userId);
  }
}
