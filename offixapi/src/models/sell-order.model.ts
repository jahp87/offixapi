import {Entity, model, property, belongsTo} from '@loopback/repository';
import {OrderService} from './order-service.model';
import {User} from './user.model';

@model()
export class SellOrder extends Entity {
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
  orderDate: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'number',
    required: true,
  })
  amount: number;

  @property({
    type: 'string',
  })
  description?: string;

  @belongsTo(() => OrderService)
  orderId: string;

  @belongsTo(() => User)
  clientId: string;

  constructor(data?: Partial<SellOrder>) {
    super(data);
  }
}

export interface SellOrderRelations {
  // describe navigational properties here
}

export type SellOrderWithRelations = SellOrder & SellOrderRelations;
