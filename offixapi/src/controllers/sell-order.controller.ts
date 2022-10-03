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
import {SellOrder} from '../models';
import {SellOrderRepository} from '../repositories';

export class SellOrderController {
  constructor(
    @repository(SellOrderRepository)
    public sellOrderRepository : SellOrderRepository,
  ) {}

  @post('/api/sellorders')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'SellOrder model instance',
    content: {'application/json': {schema: getModelSchemaRef(SellOrder)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SellOrder, {
            title: 'NewSellOrder',
            exclude: ['id'],
          }),
        },
      },
    })
    sellOrder: Omit<SellOrder, 'id'>,
  ): Promise<SellOrder> {
    return this.sellOrderRepository.create(sellOrder);
  }

  @get('/api/sellorders/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'SellOrder model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SellOrder) where?: Where<SellOrder>,
  ): Promise<Count> {
    return this.sellOrderRepository.count(where);
  }

  @get('/api/sellorders')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of SellOrder model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SellOrder, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SellOrder) filter?: Filter<SellOrder>,
  ): Promise<SellOrder[]> {
    return this.sellOrderRepository.find(filter);
  }

  @patch('/api/sellorders')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'SellOrder PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SellOrder, {partial: true}),
        },
      },
    })
    sellOrder: SellOrder,
    @param.where(SellOrder) where?: Where<SellOrder>,
  ): Promise<Count> {
    return this.sellOrderRepository.updateAll(sellOrder, where);
  }

  @get('/api/sellorders/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'SellOrder model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SellOrder, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(SellOrder, {exclude: 'where'}) filter?: FilterExcludingWhere<SellOrder>
  ): Promise<SellOrder> {
    return this.sellOrderRepository.findById(id, filter);
  }

  @patch('/api/sellorders/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'SellOrder PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SellOrder, {partial: true}),
        },
      },
    })
    sellOrder: SellOrder,
  ): Promise<void> {
    await this.sellOrderRepository.updateById(id, sellOrder);
  }

  @put('/api/sellorders/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'SellOrder PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() sellOrder: SellOrder,
  ): Promise<void> {
    await this.sellOrderRepository.replaceById(id, sellOrder);
  }

  @del('/api/sellorders/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'SellOrder DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.sellOrderRepository.deleteById(id);
  }

  @get('/api/sellorders/fulldata')
  @response(200, {
    description: 'Array of SellOrder model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SellOrder, {includeRelations: true}),
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async fulldata(
  ): Promise<SellOrder[]> {
    return this.sellOrderRepository.fulldata();
  }

  @get('/api/sellorders/fulldata/{id}')
  @response(200, {
    description: 'SellOrder model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SellOrder, {includeRelations: true}),
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async fulldataById(
    @param.path.string('id') id: string,
  ): Promise<SellOrder> {
    return this.sellOrderRepository.fulldataById(id);
  }
}
