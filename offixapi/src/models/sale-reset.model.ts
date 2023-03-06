import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Reset} from './reset.model';
import {User} from './user.model';

@model()
export class SaleReset extends Entity {

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;
  @property({
    type: 'date',
  })
  date?: string;

  @property({
    type: 'string',
  })
  transactionCode?: string;

  @belongsTo(() => User, {name: 'buyer'})
  userId: string;

  @belongsTo(() => Reset)
  resetId: string;

  constructor(data?: Partial<SaleReset>) {
    super(data);
  }
}

export interface SaleResetRelations {
  // describe navigational properties here
}

export type SaleResetWithRelations = SaleReset & SaleResetRelations;
