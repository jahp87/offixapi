import {Entity, hasMany, model, property, belongsTo} from '@loopback/repository';
import {Atribute} from './atribute.model';
import {Category} from './category.model';
import {ProductAttributeRelation} from './product-attribute-relation.model';
import {ProductCategoryRelation} from './product-category-relation.model';
import {ProductTaxRelation} from './product-tax-relation.model';
import {Tax} from './tax.model';
import {Brand} from './brand.model';

@model({settings: {strict: false}})
export class Product extends Entity {
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
  slug: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'number',
    required: true,
  })
  rating: number;

  @property({
    type: 'number',
    required: true,
  })
  reviews: number;

  @property({
    type: 'string',
  })
  badge: string;

  @property({
    type: 'string',
  })
  description: string;

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

  @hasMany(() => Tax, {through: {model: () => ProductTaxRelation}})
  taxes: Tax[];

  @hasMany(() => Atribute, {through: {model: () => ProductAttributeRelation, keyTo: 'attributeId'}})
  atributes: Atribute[];

  @belongsTo(() => Brand)
  brandId: string;

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
