import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {Product, ProductRelations, Category, ProductCategoryRelation, Tax, ProductTaxRelation} from '../models';
import {ProductCategoryRelationRepository} from './product-category-relation.repository';
import {CategoryRepository} from './category.repository';
import {ProductTaxRelationRepository} from './product-tax-relation.repository';
import {TaxRepository} from './tax.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id,
  ProductRelations
> {

  public readonly categories: HasManyThroughRepositoryFactory<Category, typeof Category.prototype.id,
          ProductCategoryRelation,
          typeof Product.prototype.id
        >;

  public readonly taxes: HasManyThroughRepositoryFactory<Tax, typeof Tax.prototype.id,
          ProductTaxRelation,
          typeof Product.prototype.id
        >;

  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource, @repository.getter('ProductCategoryRelationRepository') protected productCategoryRelationRepositoryGetter: Getter<ProductCategoryRelationRepository>, @repository.getter('CategoryRepository') protected categoryRepositoryGetter: Getter<CategoryRepository>, @repository.getter('ProductTaxRelationRepository') protected productTaxRelationRepositoryGetter: Getter<ProductTaxRelationRepository>, @repository.getter('TaxRepository') protected taxRepositoryGetter: Getter<TaxRepository>,
  ) {
    super(Product, dataSource);
    this.taxes = this.createHasManyThroughRepositoryFactoryFor('taxes', taxRepositoryGetter, productTaxRelationRepositoryGetter,);
    this.registerInclusionResolver('taxes', this.taxes.inclusionResolver);
    this.categories = this.createHasManyThroughRepositoryFactoryFor('categories', categoryRepositoryGetter, productCategoryRelationRepositoryGetter,);
    this.registerInclusionResolver('categories', this.categories.inclusionResolver);
  }
}
