import {Entity, model, property} from '@loopback/repository';

@model()
export class TypeService extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'date',
    required: true,
  })
  createdDate: string;

  @property({
    type: 'date',
    required: true,
  })
  updatedDate: string;

  @property({
    type: 'boolean',
    required: true,
  })
  enable: boolean;


  constructor(data?: Partial<TypeService>) {
    super(data);
  }
}

export interface TypeServiceRelations {
  // describe navigational properties here
}

export type TypeServiceWithRelations = TypeService & TypeServiceRelations;
