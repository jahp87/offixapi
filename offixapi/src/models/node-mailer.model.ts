import {Entity, model, property} from '@loopback/repository';
import {Envelope} from './envelope.model';

@model()
export class NodeMailer extends Entity {
  @property.array({
    type: 'string',
  })
  accepted: string[];

  @property.apply({
    type: 'string',
    required: true,
  })
  rejected: string[];

  @property({
    type: 'number',
  })
  envelopeTime?: number;

  @property({
    type: 'number',
  })
  messageTime?: number;

  @property({
    type: 'number',
  })
  messageSize?: number;

  @property({
    type: 'string',
  })
  response?: string;

  @property(() => Envelope)
  envelope?: Envelope;

  @property({
    type: 'string',
  })
  messageId?: string;

  constructor(data?: Partial<NodeMailer>) {
    super(data);
  }
}

export interface NodeMailerRelations {
  // describe navigational properties here
}

export type NodeMailerWithRelations = NodeMailer & NodeMailerRelations;
