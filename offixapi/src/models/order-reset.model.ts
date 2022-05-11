import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';
import {Reset} from './reset.model';

@model()
export class OrderReset extends Entity {
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
  date: string;

  @property({
    type: 'string',
    required: true,
  })
  note: string;

  @property({
    type: 'boolean',
    required: true,
  })
  houseservice: boolean;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @belongsTo(() => User)
  customerId: string;

  @belongsTo(() => User)
  businessId: string;

  @belongsTo(() => Reset)
  resetId: string;

  constructor(data?: Partial<OrderReset>) {
    super(data);
  }
}

export interface OrderResetRelations {
  // describe navigational properties here
}

export type OrderResetWithRelations = OrderReset & OrderResetRelations;
