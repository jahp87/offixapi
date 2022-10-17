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
import {Consecutive} from '../models';
import {ConsecutiveRepository} from '../repositories';

export class ConsecutiveController {
  constructor(
    @repository(ConsecutiveRepository)
    public consecutiveRepository : ConsecutiveRepository,
  ) {}

  @post('/api/consecutives')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @authenticate('jwt')
  @response(200, {
    description: 'Consecutive model instance',
    content: {'application/json': {schema: getModelSchemaRef(Consecutive)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consecutive, {
            title: 'NewConsecutive',
            exclude: ['id'],
          }),
        },
      },
    })
    consecutive: Omit<Consecutive, 'id'>,
  ): Promise<Consecutive> {
    return this.consecutiveRepository.create(consecutive);
  }

  @get('/api/consecutives/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Consecutive model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Consecutive) where?: Where<Consecutive>,
  ): Promise<Count> {
    return this.consecutiveRepository.count(where);
  }

  @get('/api/consecutives')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of Consecutive model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Consecutive, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Consecutive) filter?: Filter<Consecutive>,
  ): Promise<Consecutive[]> {
    return this.consecutiveRepository.find(filter);
  }

  @patch('/api/consecutives')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Consecutive PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consecutive, {partial: true}),
        },
      },
    })
    consecutive: Consecutive,
    @param.where(Consecutive) where?: Where<Consecutive>,
  ): Promise<Count> {
    return this.consecutiveRepository.updateAll(consecutive, where);
  }

  @get('/api/consecutives/{id}')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Consecutive model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Consecutive, {includeRelations: true}),
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
    @param.filter(Consecutive, {exclude: 'where'}) filter?: FilterExcludingWhere<Consecutive>
  ): Promise<Consecutive> {
    return this.consecutiveRepository.findById(id, filter);
  }

  @patch('/api/consecutives/{id}')
  @response(204, {
    description: 'Consecutive PATCH success',
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
          schema: getModelSchemaRef(Consecutive, {partial: true}),
        },
      },
    })
    consecutive: Consecutive,
  ): Promise<void> {
    await this.consecutiveRepository.updateById(id, consecutive);
  }

  @put('/api/consecutives/{id}')
  @response(204, {
    description: 'Consecutive PUT success',
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() consecutive: Consecutive,
  ): Promise<void> {
    await this.consecutiveRepository.replaceById(id, consecutive);
  }

  @del('/api/consecutives/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Consecutive DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.consecutiveRepository.deleteById(id);
  }

  @get('/api/consecutives/findbydocument')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of Consecutive model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Consecutive, {includeRelations: true}),
        },
      },
    },
  })
  async findbydocument(
    @param.path.string('document') document: string,
  ): Promise<Consecutive[]> {
    return this.consecutiveRepository.find({
      where:{
        document:document
      }
    });
  }
}
