import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {Category, CategoryRelations} from '../models';

export class CategoryRepository extends DefaultCrudRepository<
  Category,
  typeof Category.prototype.id,
  CategoryRelations
> {

  public readonly children: HasManyRepositoryFactory<Category, typeof Category.prototype.id>;

  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource, @repository.getter('CategoryRepository') protected categoryRepositoryGetter: Getter<CategoryRepository>,
  ) {
    super(Category, dataSource);
    this.children = this.createHasManyRepositoryFactoryFor('children', categoryRepositoryGetter,);
    this.registerInclusionResolver('children', this.children.inclusionResolver);
  }

  async fulldata(): Promise<Category[]> {
    return this.find({
      include: [
        {relation: 'children'}
      ]
    })
  }
}
