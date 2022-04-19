import {Entity, model, property} from '@loopback/repository';

@model()
export class ContactEmail extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
  })
  subject?: string;

  @property({
    type: 'string',
    required: true,
  })
  body: string;

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


  constructor(data?: Partial<ContactEmail>) {
    super(data);
  }
}

export interface ContactEmailRelations {
  // describe navigational properties here
}

export type ContactEmailWithRelations = ContactEmail & ContactEmailRelations;
