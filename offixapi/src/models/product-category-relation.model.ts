import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Category} from './category.model';
import {Product} from './product.model';

@model()
export class ProductCategoryRelation extends Entity {
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

  @belongsTo(() => Product)
  productId: string;

  @belongsTo(() => Category)
  categoryId: string;

  constructor(data?: Partial<ProductCategoryRelation>) {
    super(data);
  }
}

export interface ProductCategoryRelationRelations {
  // describe navigational properties here
}

export type ProductCategoryRelationWithRelations = ProductCategoryRelation & ProductCategoryRelationRelations;
