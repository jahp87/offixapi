import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {ContactEmail, ContactEmailRelations} from '../models';

export class ContactEmailRepository extends DefaultCrudRepository<
  ContactEmail,
  typeof ContactEmail.prototype.id,
  ContactEmailRelations
> {
  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource,
  ) {
    super(ContactEmail, dataSource);
  }
}
