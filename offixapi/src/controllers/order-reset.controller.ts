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
import {OrderReset} from '../models';
import {OrderResetRepository} from '../repositories';

export class OrderResetController {
  constructor(
    @repository(OrderResetRepository)
    public orderResetRepository: OrderResetRepository,
  ) { }

  @post('/api/orderresets')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'OrderReset model instance',
    content: {'application/json': {schema: getModelSchemaRef(OrderReset)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderReset, {
            title: 'NewOrderReset',
            exclude: ['id'],
          }),
        },
      },
    })
    orderReset: Omit<OrderReset, 'id'>,
  ): Promise<OrderReset> {
    return this.orderResetRepository.create(orderReset);
  }

  @get('/api/orderresets/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'OrderReset model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(OrderReset) where?: Where<OrderReset>,
  ): Promise<Count> {
    return this.orderResetRepository.count(where);
  }

  @get('/api/orderresets')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of OrderReset model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(OrderReset, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(OrderReset) filter?: Filter<OrderReset>,
  ): Promise<OrderReset[]> {
    return this.orderResetRepository.find(filter);
  }

  @patch('/api/orderresets')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'OrderReset PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderReset, {partial: true}),
        },
      },
    })
    orderReset: OrderReset,
    @param.where(OrderReset) where?: Where<OrderReset>,
  ): Promise<Count> {
    return this.orderResetRepository.updateAll(orderReset, where);
  }

  @get('/api/orderresets/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'OrderReset model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(OrderReset, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(OrderReset, {exclude: 'where'}) filter?: FilterExcludingWhere<OrderReset>
  ): Promise<OrderReset> {
    return this.orderResetRepository.findById(id, filter);
  }

  @patch('/api/orderresets/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'OrderReset PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderReset, {partial: true}),
        },
      },
    })
    orderReset: OrderReset,
  ): Promise<void> {
    await this.orderResetRepository.updateById(id, orderReset);
  }

  @put('/api/orderresets/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'OrderReset PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() orderReset: OrderReset,
  ): Promise<void> {
    await this.orderResetRepository.replaceById(id, orderReset);
  }

  @del('/api/orderresets/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'OrderReset DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.orderResetRepository.deleteById(id);
  }
}
