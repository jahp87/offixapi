import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Device} from './device.model';
import {User} from './user.model';

@model()
export class OrderService extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  failure: string;

  @property({
    type: 'boolean',
    required: true,
  })
  estado: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  delivery: boolean;

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

  @belongsTo(() => User)
  consumerId: string;

  @belongsTo(() => User)
  businessId: string;

  @belongsTo(() => Device)
  deviceId: string;

  constructor(data?: Partial<OrderService>) {
    super(data);
  }
}

export interface OrderServiceRelations {
  // describe navigational properties here
}

export type OrderServiceWithRelations = OrderService & OrderServiceRelations;
