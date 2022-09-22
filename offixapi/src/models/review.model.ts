import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Product} from './product.model';

@model()
export class Review extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
  })
  rating: number;

  @property({
    type: 'string',
  })
  name: string;

  @property({
    type: 'string',
  })
  email: string;

  @property({
    type: 'string',
  })
  text: string;

  @property({
    type: 'string',
  })
  avatar: string;

  @property({
    type: 'string',
  })
  author: string;

  @property({
    type: 'string',
  })
  date: Date;

  @belongsTo(() => Product)
  productId: string;

  constructor(data?: Partial<Review>) {
    super(data);
  }
}

export interface ReviewRelations {
  // describe navigational properties here
}

export type ReviewWithRelations = Review & ReviewRelations;
