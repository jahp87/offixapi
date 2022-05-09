import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {Device, DeviceRelations, Model} from '../models';
import {ModelRepository} from './model.repository';

export class DeviceRepository extends DefaultCrudRepository<
  Device,
  typeof Device.prototype.id,
  DeviceRelations
> {

  public readonly model: BelongsToAccessor<Model, typeof Device.prototype.id>;

  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource, @repository.getter('ModelRepository') protected modelRepositoryGetter: Getter<ModelRepository>,
  ) {
    super(Device, dataSource);
    this.model = this.createBelongsToAccessorFor('model', modelRepositoryGetter,);
    this.registerInclusionResolver('model', this.model.inclusionResolver);
  }

  async fulldata(): Promise<Device[]> {
    return this.find({
      include: [
        {
          relation: 'model',
          scope: {
            include: [
              {
                relation: 'brand'
              }
            ]
          }
        }
      ]
    });
  }

  async fulldataById(id: string): Promise<Device> {
    return this.findById(
      id,
      {
        include: [
          {
            relation: 'model',
            scope: {
              include: [
                {
                  relation: 'brand'
                }
              ]
            }
          }
        ]
      }
    );
  }
}
