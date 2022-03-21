import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Product} from './product.model';
import {Category} from './category.model';

@model()
export class ProductCategoryRelation extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

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
