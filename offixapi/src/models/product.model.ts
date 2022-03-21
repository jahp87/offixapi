import {Entity, model, property, hasMany} from '@loopback/repository';
import {Category} from './category.model';
import {ProductCategoryRelation} from './product-category-relation.model';

@model({settings: {strict: false}})
export class Product extends Entity {
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
  slug: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'number',
  })
  badge?: number;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  images: string[];

  @property({
    type: 'boolean',
    required: true,
  })
  availability: boolean;

  @property({
    type: 'number',
    required: true,
  })
  compareAtPrice: number;

  @hasMany(() => Category, {through: {model: () => ProductCategoryRelation}})
  categories: Category[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
