import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {Brand, BrandRelations, Model} from '../models';
import {ModelRepository} from './model.repository';

export class BrandRepository extends DefaultCrudRepository<
  Brand,
  typeof Brand.prototype.id,
  BrandRelations
> {

  public readonly models: HasManyRepositoryFactory<Model, typeof Brand.prototype.id>;

  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource, @repository.getter('ModelRepository') protected modelRepositoryGetter: Getter<ModelRepository>,
  ) {
    super(Brand, dataSource);
    this.models = this.createHasManyRepositoryFactoryFor('models', modelRepositoryGetter,);
    this.registerInclusionResolver('models', this.models.inclusionResolver);
  }

  async fulldata(): Promise<Brand[]> {
    return this.find({
      include: [
        {
          relation: 'models',
          scope: {
            include: [
              {
                relation: 'devices'
              }
            ]
          }
        }
      ]
    })
  }

  async fulldataById(id: string): Promise<Brand> {
    return this.findById(
      id,
      {
        include: [
          {
            relation: 'models',
            scope: {
              include: [
                {
                  relation: 'devices'
                }
              ]
            }
          }
        ]
      }
    )
  }
}
