import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {SellOrderDetails} from './sell-order-details.model';
import {User} from './user.model';

@model()
export class SellOrder extends Entity {
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
  total: number;

  @property({
    type: 'string',
  })
  description: string;

  @property({
    type: 'string',
  })
  noSellOrden: string;

  @property({
    type: 'number',
  })
  subtotal: number;

  @property({
    type: 'string',
  })
  paymentMethod: string;

  @property({
    type: 'string',
  })
  shippingAddress: string;

  @property({
    type: 'string',
  })
  billingAddress: string;


  @belongsTo(() => User)
  clientId: string;

  @hasMany(() => SellOrderDetails)
  items: SellOrderDetails[];

  constructor(data?: Partial<SellOrder>) {
    super(data);
  }
}

export interface SellOrderRelations {
  // describe navigational properties here
}

export type SellOrderWithRelations = SellOrder & SellOrderRelations;
