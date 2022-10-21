import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Province} from './province.model';
import {City} from './city.model';

@model()
export class CatShipping extends Entity {
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
  countKm: number;

  @property({
    type: 'number',
  })
  rateKM: number;

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

  @belongsTo(() => Province)
  provinceId: string;

  @belongsTo(() => City)
  cityId: string;

  constructor(data?: Partial<CatShipping>) {
    super(data);
  }
}

export interface CatShippingRelations {
  // describe navigational properties here
}

export type CatShippingWithRelations = CatShipping & CatShippingRelations;
