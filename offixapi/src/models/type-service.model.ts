import {Entity, model, property, hasMany} from '@loopback/repository';
import {Service} from './service.model';

@model()
export class TypeService extends Entity {
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

  @hasMany(() => Service)
  services: Service[];

  constructor(data?: Partial<TypeService>) {
    super(data);
  }
}

export interface TypeServiceRelations {
  // describe navigational properties here
}

export type TypeServiceWithRelations = TypeService & TypeServiceRelations;
