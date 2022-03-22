import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {ProductTaxRelation, ProductTaxRelationRelations} from '../models';

export class ProductTaxRelationRepository extends DefaultCrudRepository<
  ProductTaxRelation,
  typeof ProductTaxRelation.prototype.id,
  ProductTaxRelationRelations
> {
  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource,
  ) {
    super(ProductTaxRelation, dataSource);
  }
}
