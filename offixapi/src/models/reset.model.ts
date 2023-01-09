import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Brand} from './brand.model';
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
    type: 'string',
    required: true,
  })
  typeFile: string;

  @property({
    type: 'string',
    required: true,
  })
  model: string;

  @property({
    type: 'string',
    required: true,
    dataType: 'decimal'
  })
  price: number;

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

  @belongsTo(() => Brand)
  brandId: string;


  constructor(data?: Partial<Reset>) {
    super(data);
  }
}

export interface ResetRelations {
  // describe navigational properties here
}

export type ResetWithRelations = Reset & ResetRelations;
