import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {basicAuthorization} from '../middlewares/auth.midd';
import {
  SellOrder,
  SellOrderDetails
} from '../models';
import {SellOrderRepository} from '../repositories';

export class SellOrderSellOrderDetailsController {
  constructor(
    @repository(SellOrderRepository) protected sellOrderRepository: SellOrderRepository,
  ) { }

  @get('/api/sellorders/{id}/sellorderdetails', {
    responses: {
      '200': {
        description: 'Array of SellOrder has many SellOrderDetails',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SellOrderDetails)},
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
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<SellOrderDetails>,
  ): Promise<SellOrderDetails[]> {
    return this.sellOrderRepository.items(id).find(filter);
  }

  @post('/api/sellorders/{id}/sellorderdetails', {
    responses: {
      '200': {
        description: 'SellOrder model instance',
        content: {'application/json': {schema: getModelSchemaRef(SellOrderDetails)}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  async create(
    @param.path.string('id') id: typeof SellOrder.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SellOrderDetails, {
            title: 'NewSellOrderDetailsInSellOrder',
            exclude: ['id'],
            optional: ['sellOrderId']
          }),
        },
      },
    }) sellOrderDetails: Omit<SellOrderDetails, 'id'>,
  ): Promise<SellOrderDetails> {
    return this.sellOrderRepository.items(id).create(sellOrderDetails);
  }

  @patch('/api/sellorders/{id}/sellorderdetails', {
    responses: {
      '200': {
        description: 'SellOrder.SellOrderDetails PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SellOrderDetails, {partial: true}),
        },
      },
    })
    sellOrderDetails: Partial<SellOrderDetails>,
    @param.query.object('where', getWhereSchemaFor(SellOrderDetails)) where?: Where<SellOrderDetails>,
  ): Promise<Count> {
    return this.sellOrderRepository.items(id).patch(sellOrderDetails, where);
  }

  @del('/api/sellorders/{id}/sellorderdetails', {
    responses: {
      '200': {
        description: 'SellOrder.SellOrderDetails DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SellOrderDetails)) where?: Where<SellOrderDetails>,
  ): Promise<Count> {
    return this.sellOrderRepository.items(id).delete(where);
  }
}
