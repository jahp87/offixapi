import {Entity, model, property} from '@loopback/repository';

@model()
export class ProductTaxRelation extends Entity {
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
    type: 'string',
  })
  productId?: string;

  @property({
    type: 'string',
  })
  taxId?: string;

  constructor(data?: Partial<ProductTaxRelation>) {
    super(data);
  }
}

export interface ProductTaxRelationRelations {
  // describe navigational properties here
}

export type ProductTaxRelationWithRelations = ProductTaxRelation & ProductTaxRelationRelations;
