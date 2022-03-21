import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {ProductCategoryRelation, ProductCategoryRelationRelations, Product, Category} from '../models';
import {ProductRepository} from './product.repository';
import {CategoryRepository} from './category.repository';

export class ProductCategoryRelationRepository extends DefaultCrudRepository<
  ProductCategoryRelation,
  typeof ProductCategoryRelation.prototype.id,
  ProductCategoryRelationRelations
> {

  public readonly product: BelongsToAccessor<Product, typeof ProductCategoryRelation.prototype.id>;

  public readonly category: BelongsToAccessor<Category, typeof ProductCategoryRelation.prototype.id>;

  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>, @repository.getter('CategoryRepository') protected categoryRepositoryGetter: Getter<CategoryRepository>,
  ) {
    super(ProductCategoryRelation, dataSource);
    this.category = this.createBelongsToAccessorFor('category', categoryRepositoryGetter,);
    this.registerInclusionResolver('category', this.category.inclusionResolver);
    this.product = this.createBelongsToAccessorFor('product', productRepositoryGetter,);
    this.registerInclusionResolver('product', this.product.inclusionResolver);
  }
}
