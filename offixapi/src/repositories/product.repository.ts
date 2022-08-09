import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyThroughRepositoryFactory, repository} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {Category, Product, ProductCategoryRelation, ProductRelations, ProductTaxRelation, Tax, Atribute, ProductAttributeRelation} from '../models';
import {CategoryRepository} from './category.repository';
import {ProductCategoryRelationRepository} from './product-category-relation.repository';
import {ProductTaxRelationRepository} from './product-tax-relation.repository';
import {TaxRepository} from './tax.repository';
import {ProductAttributeRelationRepository} from './product-attribute-relation.repository';
import {AtributeRepository} from './atribute.repository';

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

  public readonly atributes: HasManyThroughRepositoryFactory<Atribute, typeof Atribute.prototype.id,
          ProductAttributeRelation,
          typeof Product.prototype.id
        >;

  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource, @repository.getter('ProductCategoryRelationRepository') protected productCategoryRelationRepositoryGetter: Getter<ProductCategoryRelationRepository>, @repository.getter('CategoryRepository') protected categoryRepositoryGetter: Getter<CategoryRepository>, @repository.getter('ProductTaxRelationRepository') protected productTaxRelationRepositoryGetter: Getter<ProductTaxRelationRepository>, @repository.getter('TaxRepository') protected taxRepositoryGetter: Getter<TaxRepository>, @repository.getter('ProductAttributeRelationRepository') protected productAttributeRelationRepositoryGetter: Getter<ProductAttributeRelationRepository>, @repository.getter('AtributeRepository') protected atributeRepositoryGetter: Getter<AtributeRepository>,
  ) {
    super(Product, dataSource);
    this.atributes = this.createHasManyThroughRepositoryFactoryFor('atributes', atributeRepositoryGetter, productAttributeRelationRepositoryGetter,);
    this.registerInclusionResolver('atributes', this.atributes.inclusionResolver);
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
