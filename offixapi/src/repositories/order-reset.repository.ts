import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {OrderReset, OrderResetRelations, User, Reset} from '../models';
import {UserRepository} from './user.repository';
import {ResetRepository} from './reset.repository';

export class OrderResetRepository extends DefaultCrudRepository<
  OrderReset,
  typeof OrderReset.prototype.id,
  OrderResetRelations
> {

  public readonly customer: BelongsToAccessor<User, typeof OrderReset.prototype.id>;

  public readonly business: BelongsToAccessor<User, typeof OrderReset.prototype.id>;

  public readonly reset: BelongsToAccessor<Reset, typeof OrderReset.prototype.id>;

  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('ResetRepository') protected resetRepositoryGetter: Getter<ResetRepository>,
  ) {
    super(OrderReset, dataSource);
    this.reset = this.createBelongsToAccessorFor('reset', resetRepositoryGetter,);
    this.registerInclusionResolver('reset', this.reset.inclusionResolver);
    this.business = this.createBelongsToAccessorFor('business', userRepositoryGetter,);
    this.registerInclusionResolver('business', this.business.inclusionResolver);
    this.customer = this.createBelongsToAccessorFor('customer', userRepositoryGetter,);
    this.registerInclusionResolver('customer', this.customer.inclusionResolver);
  }
}
