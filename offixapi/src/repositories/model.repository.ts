import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {Brand, Model, ModelRelations, Device} from '../models';
import {BrandRepository} from './brand.repository';
import {DeviceRepository} from './device.repository';

export class ModelRepository extends DefaultCrudRepository<
  Model,
  typeof Model.prototype.id,
  ModelRelations
> {

  public readonly brand: BelongsToAccessor<Brand, typeof Model.prototype.id>;

  public readonly devices: HasManyRepositoryFactory<Device, typeof Model.prototype.id>;

  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource, @repository.getter('BrandRepository') protected brandRepositoryGetter: Getter<BrandRepository>, @repository.getter('DeviceRepository') protected deviceRepositoryGetter: Getter<DeviceRepository>,
  ) {
    super(Model, dataSource);
    this.devices = this.createHasManyRepositoryFactoryFor('devices', deviceRepositoryGetter,);
    this.registerInclusionResolver('devices', this.devices.inclusionResolver);
    this.brand = this.createBelongsToAccessorFor('brand', brandRepositoryGetter,);
    this.registerInclusionResolver('brand', this.brand.inclusionResolver);
  }

  async fulldata(): Promise<Model[]> {
    return this.find({
      include:
        [
          {
            relation: 'brand'
          }
        ]
    });
  }

  async fulldataById(id: string): Promise<Model> {
    return this.findById(
      id,
      {
        include:
          [
            {
              relation: 'brand'
            }
          ]
      }
    )
  }
}
