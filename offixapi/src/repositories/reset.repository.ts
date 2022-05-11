import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {Device, Reset, ResetRelations} from '../models';
import {DeviceRepository} from './device.repository';

export class ResetRepository extends DefaultCrudRepository<
  Reset,
  typeof Reset.prototype.id,
  ResetRelations
> {

  public readonly device: BelongsToAccessor<Device, typeof Reset.prototype.id>;



  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource,
    @repository.getter('DeviceRepository') protected deviceRepositoryGetter: Getter<DeviceRepository>,

  ) {
    super(Reset, dataSource);
    this.device = this.createBelongsToAccessorFor('device', deviceRepositoryGetter,);
    this.registerInclusionResolver('device', this.device.inclusionResolver);
  }
}
