import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class CategoryTree extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

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

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<CategoryTree>) {
    super(data);
  }
}

export interface CategoryTreeRelations {
  // describe navigational properties here
}

export type CategoryTreeWithRelations = CategoryTree & CategoryTreeRelations;
