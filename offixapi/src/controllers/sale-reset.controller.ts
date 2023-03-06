import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {basicAuthorization} from '../middlewares/auth.midd';
import {SaleReset} from '../models';
import {SaleResetRepository} from '../repositories';

export class SaleResetController {
  constructor(
    @repository(SaleResetRepository)
    public saleResetRepository : SaleResetRepository,
  ) {}

  @post('/api/api/salereset')
  @response(200, {
    description: 'SaleReset model instance',
    content: {'application/json': {schema: getModelSchemaRef(SaleReset)}},
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SaleReset, {
            title: 'NewSaleReset',
            exclude: ['id'],
          }),
        },
      },
    })
    saleReset: Omit<SaleReset, 'id'>,
  ): Promise<SaleReset> {
    return this.saleResetRepository.create(saleReset);
  }


  @get('/api/api/salereset')
  @response(200, {
    description: 'Array of SaleReset model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SaleReset, {includeRelations: true}),
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
    @param.filter(SaleReset) filter?: Filter<SaleReset>,
  ): Promise<SaleReset[]> {
    return this.saleResetRepository.find(filter);
  }

  @patch('/api/salereset')
  @response(200, {
    description: 'SaleReset PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SaleReset, {partial: true}),
        },
      },
    })
    saleReset: SaleReset,
    @param.where(SaleReset) where?: Where<SaleReset>,
  ): Promise<Count> {
    return this.saleResetRepository.updateAll(saleReset, where);
  }

  @get('/api/salereset/{id}')
  @response(200, {
    description: 'SaleReset model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SaleReset, {includeRelations: true}),
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(SaleReset, {exclude: 'where'}) filter?: FilterExcludingWhere<SaleReset>
  ): Promise<SaleReset> {
    return this.saleResetRepository.findById(id, filter);
  }

  @patch('/api/salereset/{id}')
  @response(204, {
    description: 'SaleReset PATCH success',
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SaleReset, {partial: true}),
        },
      },
    })
    saleReset: SaleReset,
  ): Promise<void> {
    await this.saleResetRepository.updateById(id, saleReset);
  }

  @put('/api/salereset/{id}')
  @response(204, {
    description: 'SaleReset PUT success',
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() saleReset: SaleReset,
  ): Promise<void> {
    await this.saleResetRepository.replaceById(id, saleReset);
  }

  @del('/api/salereset/{id}')
  @response(204, {
    description: 'SaleReset DELETE success',
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.saleResetRepository.deleteById(id);
  }

  @get('/api/api/salereset/fulldata')
  @response(200, {
    description: 'Array of SaleReset model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SaleReset, {includeRelations: true}),
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  async fulldata(
  ): Promise<SaleReset[]> {
    return this.saleResetRepository.fulldata();
  }
}
