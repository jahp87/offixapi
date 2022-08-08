import {Entity, model, property} from '@loopback/repository';

@model()
export class Values extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

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

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  slug: string;

  @property({
    type: 'string',
  })
  atributeId?: string;

  constructor(data?: Partial<Values>) {
    super(data);
  }
}

export interface ValuesRelations {
  // describe navigational properties here
}

export type ValuesWithRelations = Values & ValuesRelations;
