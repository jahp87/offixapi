import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';
import {State} from './state.model';
import {City} from './city.model';

@model()
export class Profile extends Entity {
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
  })
  lastname?: string;

  @property({
    type: 'string',
  })
  phone?: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'string',
  })
  zipcode?: string;

  @property({
    type: 'string',
  })
  photo?: string;

  @property({
    type: 'string',
  })
  ruccode?: string;

  @property({
    type: 'string',
  })
  clicode?: string;

  @property({
    type: 'string',
  })
  website?: string;

  @property({
    type: 'string',
  })
  fax?: string;

  @belongsTo(() => User)
  userId: string;

  @belongsTo(() => State)
  stateId: string;

  @belongsTo(() => City)
  cityId: string;

  constructor(data?: Partial<Profile>) {
    super(data);
  }
}

export interface ProfileRelations {
  // describe navigational properties here
}

export type ProfileWithRelations = Profile & ProfileRelations;
