import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Product} from './product.model';

@model()
export class SellOrderDetails extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

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

  constructor(data?: Partial<SellOrderDetails>) {
    super(data);
  }
}

export interface SellOrderDetailsRelations {
  // describe navigational properties here
}

export type SellOrderDetailsWithRelations = SellOrderDetails & SellOrderDetailsRelations;
