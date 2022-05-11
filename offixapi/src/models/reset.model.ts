import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Device} from './device.model';

@model({settings: {strict: false}})
export class Reset extends Entity {
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
  filename: string;

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

  @belongsTo(() => Device)
  deviceId: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Reset>) {
    super(data);
  }
}

export interface ResetRelations {
  // describe navigational properties here
}

export type ResetWithRelations = Reset & ResetRelations;
