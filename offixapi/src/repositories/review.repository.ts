import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {Review, ReviewRelations, Product} from '../models';
import {ProductRepository} from './product.repository';

export class ReviewRepository extends DefaultCrudRepository<
  Review,
  typeof Review.prototype.id,
  ReviewRelations
> {

  public readonly product: BelongsToAccessor<Product, typeof Review.prototype.id>;

  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(Review, dataSource);
    this.product = this.createBelongsToAccessorFor('product', productRepositoryGetter,);
    this.registerInclusionResolver('product', this.product.inclusionResolver);
  }
}
