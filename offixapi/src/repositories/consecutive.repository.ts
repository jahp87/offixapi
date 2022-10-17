import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {Consecutive, ConsecutiveRelations} from '../models';

export class ConsecutiveRepository extends DefaultCrudRepository<
  Consecutive,
  typeof Consecutive.prototype.id,
  ConsecutiveRelations
> {
  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource,
  ) {
    super(Consecutive, dataSource);
  }
}
