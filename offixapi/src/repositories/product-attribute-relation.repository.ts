import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {ProductAttributeRelation, ProductAttributeRelationRelations} from '../models';

export class ProductAttributeRelationRepository extends DefaultCrudRepository<
  ProductAttributeRelation,
  typeof ProductAttributeRelation.prototype.id,
  ProductAttributeRelationRelations
> {
  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource,
  ) {
    super(ProductAttributeRelation, dataSource);
  }
}
