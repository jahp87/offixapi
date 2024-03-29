import {Entity, model, property} from '@loopback/repository';

@model()
export class Envelope extends Entity {
  @property({
    type: 'string',
  })
  from: string;

  @property({
    type: 'string',
  })
  to: string;


  constructor(data?: Partial<Envelope>) {
    super(data);
  }
}

export interface EnvelopeRelations {
  // describe navigational properties here
}

export type EnvelopeWithRelations = Envelope & EnvelopeRelations;
