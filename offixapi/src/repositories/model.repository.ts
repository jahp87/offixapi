import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {Brand, Model, ModelRelations} from '../models';
import {BrandRepository} from './brand.repository';

export class ModelRepository extends DefaultCrudRepository<
  Model,
  typeof Model.prototype.id,
  ModelRelations
> {

  public readonly brand: BelongsToAccessor<Brand, typeof Model.prototype.id>;

  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource, @repository.getter('BrandRepository') protected brandRepositoryGetter: Getter<BrandRepository>,
  ) {
    super(Model, dataSource);
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
