import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {Product, Review, ReviewRelations} from '../models';
import {ProductRepository} from './product.repository';

export class ReviewRepository extends DefaultCrudRepository<
  Review,
  typeof Review.prototype.id,
  ReviewRelations
> {
  fulldata(): Review[] | PromiseLike<Review[]> {
    throw new Error('Method not implemented.');
  }

  public readonly product: BelongsToAccessor<Product, typeof Review.prototype.id>;

  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(Review, dataSource);
    this.product = this.createBelongsToAccessorFor('product', productRepositoryGetter,);
    this.registerInclusionResolver('product', this.product.inclusionResolver);
  }

  async fulldata(): Promise<Review[]> {
    return this.find({
      include: [
        {relation: 'product'}
      ]
    })
  }

  async fulldataId(id: string): Promise<Review> {
    return this.findById(
      id,
      {
        include: [
          {relation: 'product'}
        ]
      }

    )
  }
}
