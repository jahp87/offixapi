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
import {SellOrderDetails} from '../models';
import {SellOrderDetailsRepository} from '../repositories';

export class SellOrderDetailsController {
  constructor(
    @repository(SellOrderDetailsRepository)
    public sellOrderDetailsRepository : SellOrderDetailsRepository,
  ) {}

  @post('/api/sellorderdetails')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'SellOrderDetails model instance',
    content: {'application/json': {schema: getModelSchemaRef(SellOrderDetails)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SellOrderDetails, {
            title: 'NewSellOrderDetails',
            exclude: ['id'],
          }),
        },
      },
    })
    sellOrderDetails: Omit<SellOrderDetails, 'id'>,
  ): Promise<SellOrderDetails> {
    return this.sellOrderDetailsRepository.create(sellOrderDetails);
  }

  @get('/api/sellorderdetails/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'SellOrderDetails model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SellOrderDetails) where?: Where<SellOrderDetails>,
  ): Promise<Count> {
    return this.sellOrderDetailsRepository.count(where);
  }

  @get('/api/sellorderdetails')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of SellOrderDetails model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SellOrderDetails, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SellOrderDetails) filter?: Filter<SellOrderDetails>,
  ): Promise<SellOrderDetails[]> {
    return this.sellOrderDetailsRepository.find(filter);
  }

  @patch('/api/sellorderdetails')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'SellOrderDetails PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SellOrderDetails, {partial: true}),
        },
      },
    })
    sellOrderDetails: SellOrderDetails,
    @param.where(SellOrderDetails) where?: Where<SellOrderDetails>,
  ): Promise<Count> {
    return this.sellOrderDetailsRepository.updateAll(sellOrderDetails, where);
  }

  @get('/api/sellorderdetails/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'SellOrderDetails model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SellOrderDetails, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(SellOrderDetails, {exclude: 'where'}) filter?: FilterExcludingWhere<SellOrderDetails>
  ): Promise<SellOrderDetails> {
    return this.sellOrderDetailsRepository.findById(id, filter);
  }

  @patch('/api/sellorderdetails/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'SellOrderDetails PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SellOrderDetails, {partial: true}),
        },
      },
    })
    sellOrderDetails: SellOrderDetails,
  ): Promise<void> {
    await this.sellOrderDetailsRepository.updateById(id, sellOrderDetails);
  }

  @put('/api/sellorderdetails/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'SellOrderDetails PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() sellOrderDetails: SellOrderDetails,
  ): Promise<void> {
    await this.sellOrderDetailsRepository.replaceById(id, sellOrderDetails);
  }

  @del('/api/sellorderdetails/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'SellOrderDetails DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.sellOrderDetailsRepository.deleteById(id);
  }

  @get('/api/sellorderdetails/fulldata')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of SellOrderDetails model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SellOrderDetails, {includeRelations: true}),
        },
      },
    },
  })
  async fulldata(
  ): Promise<SellOrderDetails[]> {
    return this.sellOrderDetailsRepository.fulldata();
  }

  @get('/api/sellorderdetails/fulldata/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'SellOrderDetails model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SellOrderDetails, {includeRelations: true}),
      },
    },
  })
  async fulldataById(
    @param.path.string('id') id: string,
    ): Promise<SellOrderDetails> {
    return this.sellOrderDetailsRepository.fulldataById(id);
  }
}
