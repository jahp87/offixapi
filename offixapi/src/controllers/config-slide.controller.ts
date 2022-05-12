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
import {ConfigSlide} from '../models';
import {ConfigSlideRepository} from '../repositories';

export class ConfigSlideController {
  constructor(
    @repository(ConfigSlideRepository)
    public configSlideRepository: ConfigSlideRepository,
  ) { }

  @post('/api/configslides')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'ConfigSlide model instance',
    content: {'application/json': {schema: getModelSchemaRef(ConfigSlide)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ConfigSlide, {
            title: 'NewConfigSlide',
            exclude: ['id'],
          }),
        },
      },
    })
    configSlide: Omit<ConfigSlide, 'id'>,
  ): Promise<ConfigSlide> {
    return this.configSlideRepository.create(configSlide);
  }

  @get('/api/configslides/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'ConfigSlide model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ConfigSlide) where?: Where<ConfigSlide>,
  ): Promise<Count> {
    return this.configSlideRepository.count(where);
  }

  @get('/api/configslides')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of ConfigSlide model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ConfigSlide, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ConfigSlide) filter?: Filter<ConfigSlide>,
  ): Promise<ConfigSlide[]> {
    return this.configSlideRepository.find(filter);
  }

  @patch('/api/configslides')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'ConfigSlide PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ConfigSlide, {partial: true}),
        },
      },
    })
    configSlide: ConfigSlide,
    @param.where(ConfigSlide) where?: Where<ConfigSlide>,
  ): Promise<Count> {
    return this.configSlideRepository.updateAll(configSlide, where);
  }

  @get('/api/configslides/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'ConfigSlide model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ConfigSlide, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ConfigSlide, {exclude: 'where'}) filter?: FilterExcludingWhere<ConfigSlide>
  ): Promise<ConfigSlide> {
    return this.configSlideRepository.findById(id, filter);
  }

  @patch('/api/configslides/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'ConfigSlide PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ConfigSlide, {partial: true}),
        },
      },
    })
    configSlide: ConfigSlide,
  ): Promise<void> {
    await this.configSlideRepository.updateById(id, configSlide);
  }

  @put('/api/configslides/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'ConfigSlide PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() configSlide: ConfigSlide,
  ): Promise<void> {
    await this.configSlideRepository.replaceById(id, configSlide);
  }

  @del('/api/configslides/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'ConfigSlide DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.configSlideRepository.deleteById(id);
  }
}
