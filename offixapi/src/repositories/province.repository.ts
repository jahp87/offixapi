import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {Province, ProvinceRelations} from '../models';

export class ProvinceRepository extends DefaultCrudRepository<
  Province,
  typeof Province.prototype.id,
  ProvinceRelations
> {
  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource,
  ) {
    super(Province, dataSource);
  }
}
