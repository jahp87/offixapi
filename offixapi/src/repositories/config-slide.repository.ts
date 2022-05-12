import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {ConfigSlide, ConfigSlideRelations} from '../models';

export class ConfigSlideRepository extends DefaultCrudRepository<
  ConfigSlide,
  typeof ConfigSlide.prototype.id,
  ConfigSlideRelations
> {
  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource,
  ) {
    super(ConfigSlide, dataSource);
  }
}
