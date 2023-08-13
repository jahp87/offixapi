import {Entity, model, property} from '@loopback/repository';

@model()
export class Multipleconfig extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  code?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'number',
  })
  value?: number;


  constructor(data?: Partial<Multipleconfig>) {
    super(data);
  }
}

export interface MultipleconfigRelations {
  // describe navigational properties here
}

export type MultipleconfigWithRelations = Multipleconfig & MultipleconfigRelations;
