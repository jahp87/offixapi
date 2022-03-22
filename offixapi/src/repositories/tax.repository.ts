import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {Tax, TaxRelations} from '../models';

export class TaxRepository extends DefaultCrudRepository<
  Tax,
  typeof Tax.prototype.id,
  TaxRelations
> {
  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource,
  ) {
    super(Tax, dataSource);
  }
}
