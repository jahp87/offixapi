import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {Brand, Device, Reset, ResetRelations} from '../models';
import {BrandRepository} from './brand.repository';
import {DeviceRepository} from './device.repository';

export class ResetRepository extends DefaultCrudRepository<
  Reset,
  typeof Reset.prototype.id,
  ResetRelations
> {

  public readonly device: BelongsToAccessor<Device, typeof Reset.prototype.id>;

  public readonly brand: BelongsToAccessor<Brand, typeof Reset.prototype.id>;

  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource,
    @repository.getter('DeviceRepository') protected deviceRepositoryGetter: Getter<DeviceRepository>, @repository.getter('BrandRepository') protected brandRepositoryGetter: Getter<BrandRepository>,

  ) {
    super(Reset, dataSource);
    this.brand = this.createBelongsToAccessorFor('brand', brandRepositoryGetter,);
    this.registerInclusionResolver('brand', this.brand.inclusionResolver);
    this.device = this.createBelongsToAccessorFor('device', deviceRepositoryGetter,);
    this.registerInclusionResolver('device', this.device.inclusionResolver);
  }

  async fulldata(): Promise<Reset[]>{
    return this.find({
      include:[
        {
          relation:'device'
        },
        {
          relation:'brand'
        }
      ]
    })
  }

}
