import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {Multipleconfig, MultipleconfigRelations} from '../models';

export class MultipleconfigRepository extends DefaultCrudRepository<
  Multipleconfig,
  typeof Multipleconfig.prototype.id,
  MultipleconfigRelations
> {
  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource,
  ) {
    super(Multipleconfig, dataSource);
  }
}
