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
import {Reset} from '../models';
import {ResetRepository} from '../repositories';

export class ResetController {
  constructor(
    @repository(ResetRepository)
    public resetRepository: ResetRepository,
  ) { }

  @post('/api/resets')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Reset model instance',
    content: {'application/json': {schema: getModelSchemaRef(Reset)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reset, {
            title: 'NewReset',
            exclude: ['id'],
          }),
        },
      },
    })
    reset: Omit<Reset, 'id'>,
  ): Promise<Reset> {
    return this.resetRepository.create(reset);
  }

  @get('/api/resets/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Reset model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Reset) where?: Where<Reset>,
  ): Promise<Count> {
    return this.resetRepository.count(where);
  }

  @get('/api/resets')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of Reset model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Reset, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Reset) filter?: Filter<Reset>,
  ): Promise<Reset[]> {
    return this.resetRepository.find(filter);
  }

  @patch('/api/resets')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Reset PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reset, {partial: true}),
        },
      },
    })
    reset: Reset,
    @param.where(Reset) where?: Where<Reset>,
  ): Promise<Count> {
    return this.resetRepository.updateAll(reset, where);
  }

  @get('/api/resets/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Reset model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Reset, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Reset, {exclude: 'where'}) filter?: FilterExcludingWhere<Reset>
  ): Promise<Reset> {
    return this.resetRepository.findById(id, filter);
  }

  @patch('/api/resets/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Reset PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reset, {partial: true}),
        },
      },
    })
    reset: Reset,
  ): Promise<void> {
    await this.resetRepository.updateById(id, reset);
  }

  @put('/api/resets/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Reset PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() reset: Reset,
  ): Promise<void> {
    await this.resetRepository.replaceById(id, reset);
  }

  @del('/api/resets/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Reset DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.resetRepository.deleteById(id);
  }
}
