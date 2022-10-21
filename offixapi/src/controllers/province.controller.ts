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
import {Province} from '../models';
import {ProvinceRepository} from '../repositories';

export class ProvinceController {
  constructor(
    @repository(ProvinceRepository)
    public provinceRepository : ProvinceRepository,
  ) {}

  @post('/api/provinces')
  @response(200, {
    description: 'Province model instance',
    content: {'application/json': {schema: getModelSchemaRef(Province)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Province, {
            title: 'NewProvince',
            exclude: ['id'],
          }),
        },
      },
    })
    province: Omit<Province, 'id'>,
  ): Promise<Province> {
    return this.provinceRepository.create(province);
  }

  @get('/api/provinces/count')
  @response(200, {
    description: 'Province model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Province) where?: Where<Province>,
  ): Promise<Count> {
    return this.provinceRepository.count(where);
  }

  @get('/api/provinces')
  @response(200, {
    description: 'Array of Province model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Province, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Province) filter?: Filter<Province>,
  ): Promise<Province[]> {
    return this.provinceRepository.find(filter);
  }

  @patch('/api/provinces')
  @response(200, {
    description: 'Province PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Province, {partial: true}),
        },
      },
    })
    province: Province,
    @param.where(Province) where?: Where<Province>,
  ): Promise<Count> {
    return this.provinceRepository.updateAll(province, where);
  }

  @get('/api/provinces/{id}')
  @response(200, {
    description: 'Province model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Province, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Province, {exclude: 'where'}) filter?: FilterExcludingWhere<Province>
  ): Promise<Province> {
    return this.provinceRepository.findById(id, filter);
  }

  @patch('/api/provinces/{id}')
  @response(204, {
    description: 'Province PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Province, {partial: true}),
        },
      },
    })
    province: Province,
  ): Promise<void> {
    await this.provinceRepository.updateById(id, province);
  }

  @put('/api/provinces/{id}')
  @response(204, {
    description: 'Province PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() province: Province,
  ): Promise<void> {
    await this.provinceRepository.replaceById(id, province);
  }

  @del('/api/provinces/{id}')
  @response(204, {
    description: 'Province DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.provinceRepository.deleteById(id);
  }
}
