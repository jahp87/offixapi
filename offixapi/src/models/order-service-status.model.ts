import {Entity, model, property} from '@loopback/repository';

@model()
export class OrderServiceStatus extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;


  constructor(data?: Partial<OrderServiceStatus>) {
    super(data);
  }
}

export interface OrderServiceStatusRelations {
  // describe navigational properties here
}

export type OrderServiceStatusWithRelations = OrderServiceStatus & OrderServiceStatusRelations;
