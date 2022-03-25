import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Country} from './country.model';
import {City} from './city.model';
import {State} from './state.model';
import {User} from './user.model';

@model()
export class Address extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  lastname: string;

  @property({
    type: 'string',
  })
  company?: string;

  @property({
    type: 'string',
    required: true,
  })
  street: string;

  @property({
    type: 'string',
    required: true,
  })
  apartament: string;

  @property({
    type: 'string',
    required: true,
  })
  zip: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  phone: string;

  @property({
    type: 'string',
    required: true,
  })
  website: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isPrincipal: boolean;

  @belongsTo(() => Country)
  countryId: string;

  @belongsTo(() => City)
  cityId: string;

  @belongsTo(() => State)
  stateId: string;

  @belongsTo(() => User)
  userId: string;

  constructor(data?: Partial<Address>) {
    super(data);
  }
}

export interface AddressRelations {
  // describe navigational properties here
}

export type AddressWithRelations = Address & AddressRelations;
