import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  Where,
  repository
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {basicAuthorization} from '../middlewares/auth.midd';
import {OrderService} from '../models';
import {OrderServiceRepository} from '../repositories';

export class OrderServiceController {
  constructor(
    @repository(OrderServiceRepository)
    public orderServiceRepository: OrderServiceRepository,
  ) { }

  @post('/api/orderservices')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'OrderService model instance',
    content: {'application/json': {schema: getModelSchemaRef(OrderService)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderService, {
            title: 'NewOrderService',
            exclude: ['id'],
          }),
        },
      },
    })
    orderService: Omit<OrderService, 'id'>,
  ): Promise<OrderService> {
    return this.orderServiceRepository.create(orderService);
  }

  @get('/api/orderservices/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'OrderService model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(OrderService) where?: Where<OrderService>,
  ): Promise<Count> {
    return this.orderServiceRepository.count(where);
  }

  @get('/api/orderservices')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of OrderService model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(OrderService, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(OrderService) filter?: Filter<OrderService>,
  ): Promise<OrderService[]> {
    return this.orderServiceRepository.find(filter);
  }

  @patch('/api/orderservices')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'OrderService PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderService, {partial: true}),
        },
      },
    })
    orderService: OrderService,
    @param.where(OrderService) where?: Where<OrderService>,
  ): Promise<Count> {
    return this.orderServiceRepository.updateAll(orderService, where);
  }

  @get('/api/orderservices/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'OrderService model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(OrderService, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(OrderService, {exclude: 'where'}) filter?: FilterExcludingWhere<OrderService>
  ): Promise<OrderService> {
    return this.orderServiceRepository.findById(id, filter);
  }

  @patch('/api/orderservices/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'OrderService PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderService, {partial: true}),
        },
      },
    })
    orderService: OrderService,
  ): Promise<void> {
    await this.orderServiceRepository.updateById(id, orderService);
  }

  @put('/api/orderservices/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'OrderService PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() orderService: OrderService,
  ): Promise<void> {
    await this.orderServiceRepository.replaceById(id, orderService);
  }

  @del('/api/orderservices/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'OrderService DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.orderServiceRepository.deleteById(id);
  }

  @get('/api/orderservices/fulldata')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of OrderService model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(OrderService, {includeRelations: true}),
        },
      },
    },
  })
  async fulldata(
  ): Promise<OrderService[]> {
    return this.orderServiceRepository.fulldata();
  }

  @get('/api/orderservices/fulldata/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'OrderService model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(OrderService, {includeRelations: true}),
      },
    },
  })
  async fulldataById(
    @param.path.string('id') id: string,
  ): Promise<OrderService> {
    return this.orderServiceRepository.fulldataById(id);
  }

  @get('/api/orderservices/fulldatabyuser/{customerId}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'business', 'user'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'OrderService model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(OrderService, {includeRelations: true}),
      },
    },
  })
  async fulldataByUser(
    @param.path.string('customerId') customerId: string,
  ): Promise<OrderService[]> {
    return this.orderServiceRepository.fulldataByUser(customerId);
  }
}
