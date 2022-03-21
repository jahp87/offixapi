import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {Product, ProductRelations, Category, ProductCategoryRelation} from '../models';
import {ProductCategoryRelationRepository} from './product-category-relation.repository';
import {CategoryRepository} from './category.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id,
  ProductRelations
> {

  public readonly categories: HasManyThroughRepositoryFactory<Category, typeof Category.prototype.id,
          ProductCategoryRelation,
          typeof Product.prototype.id
        >;

  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource, @repository.getter('ProductCategoryRelationRepository') protected productCategoryRelationRepositoryGetter: Getter<ProductCategoryRelationRepository>, @repository.getter('CategoryRepository') protected categoryRepositoryGetter: Getter<CategoryRepository>,
  ) {
    super(Product, dataSource);
    this.categories = this.createHasManyThroughRepositoryFactoryFor('categories', categoryRepositoryGetter, productCategoryRelationRepositoryGetter,);
    this.registerInclusionResolver('categories', this.categories.inclusionResolver);
  }
}
