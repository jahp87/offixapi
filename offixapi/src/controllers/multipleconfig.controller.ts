import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Multipleconfig} from '../models';
import {MultipleconfigRepository} from '../repositories';

export class MultipleconfigController {
  constructor(
    @repository(MultipleconfigRepository)
    public multipleconfigRepository : MultipleconfigRepository,
  ) {}

  @post('/multipleconfigs')
  @response(200, {
    description: 'Multipleconfig model instance',
    content: {'application/json': {schema: getModelSchemaRef(Multipleconfig)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Multipleconfig, {
            title: 'NewMultipleconfig',
            exclude: ['id'],
          }),
        },
      },
    })
    multipleconfig: Omit<Multipleconfig, 'id'>,
  ): Promise<Multipleconfig> {
    return this.multipleconfigRepository.create(multipleconfig);
  }

  @get('/multipleconfigs/count')
  @response(200, {
    description: 'Multipleconfig model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Multipleconfig) where?: Where<Multipleconfig>,
  ): Promise<Count> {
    return this.multipleconfigRepository.count(where);
  }

  @get('/multipleconfigs')
  @response(200, {
    description: 'Array of Multipleconfig model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Multipleconfig, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Multipleconfig) filter?: Filter<Multipleconfig>,
  ): Promise<Multipleconfig[]> {
    return this.multipleconfigRepository.find(filter);
  }

  @patch('/multipleconfigs')
  @response(200, {
    description: 'Multipleconfig PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Multipleconfig, {partial: true}),
        },
      },
    })
    multipleconfig: Multipleconfig,
    @param.where(Multipleconfig) where?: Where<Multipleconfig>,
  ): Promise<Count> {
    return this.multipleconfigRepository.updateAll(multipleconfig, where);
  }

  @get('/multipleconfigs/{id}')
  @response(200, {
    description: 'Multipleconfig model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Multipleconfig, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Multipleconfig, {exclude: 'where'}) filter?: FilterExcludingWhere<Multipleconfig>
  ): Promise<Multipleconfig> {
    return this.multipleconfigRepository.findById(id, filter);
  }

  @patch('/multipleconfigs/{id}')
  @response(204, {
    description: 'Multipleconfig PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Multipleconfig, {partial: true}),
        },
      },
    })
    multipleconfig: Multipleconfig,
  ): Promise<void> {
    await this.multipleconfigRepository.updateById(id, multipleconfig);
  }

  @put('/multipleconfigs/{id}')
  @response(204, {
    description: 'Multipleconfig PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() multipleconfig: Multipleconfig,
  ): Promise<void> {
    await this.multipleconfigRepository.replaceById(id, multipleconfig);
  }

  @del('/multipleconfigs/{id}')
  @response(204, {
    description: 'Multipleconfig DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.multipleconfigRepository.deleteById(id);
  }
}
