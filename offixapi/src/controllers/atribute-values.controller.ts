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
  Atribute,
  Values
} from '../models';
import {AtributeRepository} from '../repositories';

export class AtributeValuesController {
  constructor(
    @repository(AtributeRepository) protected atributeRepository: AtributeRepository,
  ) { }

  @get('/api/atributes/{id}/values', {
    responses: {
      '200': {
        description: 'Array of Atribute has many Values',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Values)},
          },
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Values>,
  ): Promise<Values[]> {
    return this.atributeRepository.values(id).find(filter);
  }

  @post('/api/atributes/{id}/values', {
    responses: {
      '200': {
        description: 'Atribute model instance',
        content: {'application/json': {schema: getModelSchemaRef(Values)}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async create(
    @param.path.string('id') id: typeof Atribute.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Values, {
            title: 'NewValuesInAtribute',
            exclude: ['id'],
            optional: ['atributeId']
          }),
        },
      },
    }) values: Omit<Values, 'id'>,
  ): Promise<Values> {
    return this.atributeRepository.values(id).create(values);
  }

  @patch('/api/atributes/{id}/values', {
    responses: {
      '200': {
        description: 'Atribute.Values PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Values, {partial: true}),
        },
      },
    })
    values: Partial<Values>,
    @param.query.object('where', getWhereSchemaFor(Values)) where?: Where<Values>,
  ): Promise<Count> {
    return this.atributeRepository.values(id).patch(values, where);
  }

  @del('/api/atributes/{id}/values', {
    responses: {
      '200': {
        description: 'Atribute.Values DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Values)) where?: Where<Values>,
  ): Promise<Count> {
    return this.atributeRepository.values(id).delete(where);
  }
}

