import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {Reset, ResetRelations, Device, User} from '../models';
import {DeviceRepository} from './device.repository';
import {UserRepository} from './user.repository';

export class ResetRepository extends DefaultCrudRepository<
  Reset,
  typeof Reset.prototype.id,
  ResetRelations
> {

  public readonly device: BelongsToAccessor<Device, typeof Reset.prototype.id>;

  public readonly owner: BelongsToAccessor<User, typeof Reset.prototype.id>;

  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource, @repository.getter('DeviceRepository') protected deviceRepositoryGetter: Getter<DeviceRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Reset, dataSource);
    this.owner = this.createBelongsToAccessorFor('owner', userRepositoryGetter,);
    this.registerInclusionResolver('owner', this.owner.inclusionResolver);
    this.device = this.createBelongsToAccessorFor('device', deviceRepositoryGetter,);
    this.registerInclusionResolver('device', this.device.inclusionResolver);
  }
}
