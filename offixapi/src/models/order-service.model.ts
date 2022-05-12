import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Service} from './service.model';
import {User} from './user.model';
import {Brand} from './brand.model';
import {Device} from './device.model';

@model()
export class OrderService extends Entity {
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
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  failure: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;


  @property({
    type: 'string',
    required: true,
  })
  model: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'boolean',
    required: true,
  })
  houseservice: boolean;

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
  customerId: string;

  @belongsTo(() => User)
  businessId: string;

  @belongsTo(() => Service)
  serviceId: string;

  @belongsTo(() => Brand)
  brandId: string;

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
