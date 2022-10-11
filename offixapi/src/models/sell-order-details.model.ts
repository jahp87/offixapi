import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Product} from './product.model';
import {SellOrder} from './sell-order.model';

@model()
export class SellOrderDetails extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;

  @property({
    type: 'number',
  })
  price: number;

  @property({
    type: 'number',
    required: true,
  })
  amount: number;

  @belongsTo(() => Product)
  productId: string;

  @belongsTo(() => SellOrder)
  sellOrderId: string;

  constructor(data?: Partial<SellOrderDetails>) {
    super(data);
  }
}

export interface SellOrderDetailsRelations {
  // describe navigational properties here
}

export type SellOrderDetailsWithRelations = SellOrderDetails & SellOrderDetailsRelations;
