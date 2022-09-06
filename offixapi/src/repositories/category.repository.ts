
import {bind, BindingScope, Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {Category, CategoryRelations} from '../models';


@bind({scope: BindingScope.SINGLETON})
export class CategoryRepository extends DefaultCrudRepository<
  Category,
  typeof Category.prototype.id,
  CategoryRelations
> {

  public readonly children: HasManyRepositoryFactory<Category, typeof Category.prototype.id>;

  public readonly category: BelongsToAccessor<Category, typeof Category.prototype.id>;

  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource, @repository.getter('CategoryRepository') protected categoryRepositoryGetter: Getter<CategoryRepository>,
  ) {
    super(Category, dataSource);
    this.category = this.createBelongsToAccessorFor('category', categoryRepositoryGetter,);
    this.registerInclusionResolver('category', this.category.inclusionResolver);
    this.children = this.createHasManyRepositoryFactoryFor('children', Getter.fromValue(this),);
    this.registerInclusionResolver('children', this.children.inclusionResolver);
  }

  async fulldata(categoryId: string): Promise<Category | null> {
    return this.findOne(
      {where:{
        categoryId: categoryId
      },
      include: [
        {relation: 'children',
        scope:{
          include:[
            {
              relation:'children',
              scope:{
                include:[
                  {
                    relation:'children',
                    scope:{
                      include:[
                        {
                          relation:'children',
                          scope:{
                            include:[
                             {
                              relation:'children',
                              scope:{
                                include:[
                                  {
                                    relation:'children'
                                  }
                                ]
                              }
                             }
                            ]
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      }
      ]
    })
  }
}
