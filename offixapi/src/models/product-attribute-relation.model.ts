import {Entity, model, property} from '@loopback/repository';

@model()
export class ProductAttributeRelation extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
  })
  productId: string;

  @property({
    type: 'string',
  })
  attributeId: string;

  constructor(data?: Partial<ProductAttributeRelation>) {
    super(data);
  }
}

export interface ProductAttributeRelationRelations {
  // describe navigational properties here
}

export type ProductAttributeRelationWithRelations = ProductAttributeRelation & ProductAttributeRelationRelations;
