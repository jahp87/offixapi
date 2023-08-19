import {Entity, belongsTo, model, property} from '@loopback/repository';
import {City} from './city.model';
import {Country} from './country.model';
import {State} from './state.model';
import {User} from './user.model';

@model()
export class Address extends Entity {
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
  company: string;

  @property({
    type: 'string',
  })
  street: string;

  @property({
    type: 'string',

  })
  apartament: string;

  @property({
    type: 'string',

  })
  zip: string;

  @property({
    type: 'string',

  })
  email: string;

  @property({
    type: 'string',

  })
  phone: string;

  @property({
    type: 'string',

  })
  website: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isPrincipal: boolean;


  @property({
    type: 'number',
    dataType: 'decimal'
  })
  latitude: number;

  @property({
    type: 'number',
    dataType: 'decimal'
  })
  longitude: number;

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
