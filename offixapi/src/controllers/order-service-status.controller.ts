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
import {OrderServiceStatus} from '../models';
import {OrderServiceStatusRepository} from '../repositories';

export class OrderServiceStatusController {
  constructor(
    @repository(OrderServiceStatusRepository)
    public orderServiceStatusRepository: OrderServiceStatusRepository,
  ) { }

  @post('/api/orderservicestatuses')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'OrderServiceStatus model instance',
    content: {'application/json': {schema: getModelSchemaRef(OrderServiceStatus)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderServiceStatus, {
            title: 'NewOrderServiceStatus',
            exclude: ['id'],
          }),
        },
      },
    })
    orderServiceStatus: Omit<OrderServiceStatus, 'id'>,
  ): Promise<OrderServiceStatus> {
    return this.orderServiceStatusRepository.create(orderServiceStatus);
  }

  @get('/api/orderservicestatuses/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'OrderServiceStatus model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(OrderServiceStatus) where?: Where<OrderServiceStatus>,
  ): Promise<Count> {
    return this.orderServiceStatusRepository.count(where);
  }

  @get('/api/orderservicestatuses')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of OrderServiceStatus model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(OrderServiceStatus, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(OrderServiceStatus) filter?: Filter<OrderServiceStatus>,
  ): Promise<OrderServiceStatus[]> {
    return this.orderServiceStatusRepository.find(filter);
  }

  @patch('/api/orderservicestatuses')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'OrderServiceStatus PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderServiceStatus, {partial: true}),
        },
      },
    })
    orderServiceStatus: OrderServiceStatus,
    @param.where(OrderServiceStatus) where?: Where<OrderServiceStatus>,
  ): Promise<Count> {
    return this.orderServiceStatusRepository.updateAll(orderServiceStatus, where);
  }

  @get('/api/orderservicestatuses/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'OrderServiceStatus model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(OrderServiceStatus, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(OrderServiceStatus, {exclude: 'where'}) filter?: FilterExcludingWhere<OrderServiceStatus>
  ): Promise<OrderServiceStatus> {
    return this.orderServiceStatusRepository.findById(id, filter);
  }

  @patch('/api/orderservicestatuses/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'OrderServiceStatus PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderServiceStatus, {partial: true}),
        },
      },
    })
    orderServiceStatus: OrderServiceStatus,
  ): Promise<void> {
    await this.orderServiceStatusRepository.updateById(id, orderServiceStatus);
  }

  @put('/api/orderservicestatuses/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'OrderServiceStatus PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() orderServiceStatus: OrderServiceStatus,
  ): Promise<void> {
    await this.orderServiceStatusRepository.replaceById(id, orderServiceStatus);
  }

  @del('/api/orderservicestatuses/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'OrderServiceStatus DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.orderServiceStatusRepository.deleteById(id);
  }
}
