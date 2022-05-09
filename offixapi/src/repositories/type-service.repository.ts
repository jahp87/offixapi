import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {TypeService, TypeServiceRelations} from '../models';

export class TypeServiceRepository extends DefaultCrudRepository<
  TypeService,
  typeof TypeService.prototype.id,
  TypeServiceRelations
> {
  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource,
  ) {
    super(TypeService, dataSource);
  }
}
