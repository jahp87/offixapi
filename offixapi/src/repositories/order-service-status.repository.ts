import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {OrderServiceStatus, OrderServiceStatusRelations} from '../models';

export class OrderServiceStatusRepository extends DefaultCrudRepository<
  OrderServiceStatus,
  typeof OrderServiceStatus.prototype.id,
  OrderServiceStatusRelations
> {
  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource,
  ) {
    super(OrderServiceStatus, dataSource);
  }
}
