import {Entity, hasMany, model, property} from '@loopback/repository';
import {Values} from './values.model';

@model()
export class Atribute extends Entity {
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
  })
  slug?: string;

  @hasMany(() => Values)
  values: Values[];

  constructor(data?: Partial<Atribute>) {
    super(data);
  }
}

export interface AtributeRelations {
  // describe navigational properties here
}

export type AtributeWithRelations = Atribute & AtributeRelations;
