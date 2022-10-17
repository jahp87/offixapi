import {Entity, model, property} from '@loopback/repository';

@model()
export class Consecutive extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  prefix: string;

  @property({
    type: 'number',
    required: true,
  })
  sequential: number;

  @property({
    type: 'string',
    required: true,
  })
  document: string;


  constructor(data?: Partial<Consecutive>) {
    super(data);
  }
}

export interface ConsecutiveRelations {
  // describe navigational properties here
}

export type ConsecutiveWithRelations = Consecutive & ConsecutiveRelations;
