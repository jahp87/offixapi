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
import {Atribute} from '../models';
import {AtributeRepository} from '../repositories';

export class AttributeController {
  constructor(
    @repository(AtributeRepository)
    public atributeRepository : AtributeRepository,
  ) {}

  @post('/api/attributes')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Atribute model instance',
    content: {'application/json': {schema: getModelSchemaRef(Atribute)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atribute, {
            title: 'NewAtribute',
            exclude: ['id'],
          }),
        },
      },
    })
    atribute: Omit<Atribute, 'id'>,
  ): Promise<Atribute> {
    return this.atributeRepository.create(atribute);
  }

  @get('/api/attributes/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Atribute model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Atribute) where?: Where<Atribute>,
  ): Promise<Count> {
    return this.atributeRepository.count(where);
  }

  @get('/api/attributes')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of Atribute model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Atribute, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Atribute) filter?: Filter<Atribute>,
  ): Promise<Atribute[]> {
    return this.atributeRepository.find(filter);
  }

  @patch('/api/attributes')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Atribute PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atribute, {partial: true}),
        },
      },
    })
    atribute: Atribute,
    @param.where(Atribute) where?: Where<Atribute>,
  ): Promise<Count> {
    return this.atributeRepository.updateAll(atribute, where);
  }

  @get('/api/attributes/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Atribute model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Atribute, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Atribute, {exclude: 'where'}) filter?: FilterExcludingWhere<Atribute>
  ): Promise<Atribute> {
    return this.atributeRepository.findById(id, filter);
  }

  @patch('/api/attributes/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Atribute PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atribute, {partial: true}),
        },
      },
    })
    atribute: Atribute,
  ): Promise<void> {
    await this.atributeRepository.updateById(id, atribute);
  }

  @put('/api/attributes/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Atribute PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() atribute: Atribute,
  ): Promise<void> {
    await this.atributeRepository.replaceById(id, atribute);
  }

  @del('/api/attributes/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Atribute DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.atributeRepository.deleteById(id);
  }

  @get('/api/attributes/fulldata/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user', 'business'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Attribute model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Atribute, {includeRelations: true}),
      },
    },
  })
  async fulldataById(
    @param.path.string('id') id: string){
    return this.atributeRepository.fulldataById(id);
  }
}
