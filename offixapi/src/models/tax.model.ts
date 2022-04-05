import {Entity, model, property} from '@loopback/repository';

@model()
export class Tax extends Entity {
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
    type: 'number',
    required: true,
  })
  value: number;

  @property({
    type: 'string',
  })
  description?: string;


  constructor(data?: Partial<Tax>) {
    super(data);
  }
}

export interface TaxRelations {
  // describe navigational properties here
}

export type TaxWithRelations = Tax & TaxRelations;
