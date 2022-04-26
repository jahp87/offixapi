import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyThroughRepositoryFactory, repository} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {Category, Product, ProductCategoryRelation, ProductRelations, ProductTaxRelation, Tax} from '../models';
import {CategoryRepository} from './category.repository';
import {ProductCategoryRelationRepository} from './product-category-relation.repository';
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

  async fulldata(): Promise<Product[]> {
    return this.find({
      include: [
        {relation: 'categories'},
        {relation: 'taxes'}
      ]
    })
  }

  async fulldataId(id: string): Promise<Product> {
    return this.findById(
      id,
      {
        include: [
          {relation: 'categories'},
          {relation: 'taxes'}
        ]
      }

    )
  }
}
