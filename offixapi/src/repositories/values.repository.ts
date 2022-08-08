import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {Values, ValuesRelations} from '../models';

export class ValuesRepository extends DefaultCrudRepository<
  Values,
  typeof Values.prototype.id,
  ValuesRelations
> {
  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource,
  ) {
    super(Values, dataSource);
  }
}
