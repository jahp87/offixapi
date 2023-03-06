import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {Reset, SaleReset, SaleResetRelations, User} from '../models';
import {ResetRepository} from './reset.repository';
import {UserRepository} from './user.repository';

export class SaleResetRepository extends DefaultCrudRepository<
  SaleReset,
  typeof SaleReset.prototype.id,
  SaleResetRelations
> {


  public readonly buyer: BelongsToAccessor<User, typeof SaleReset.prototype.id>;

  public readonly reset: BelongsToAccessor<Reset, typeof SaleReset.prototype.id>;

  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('ResetRepository') protected resetRepositoryGetter: Getter<ResetRepository>,
  ) {
    super(SaleReset, dataSource);
    this.reset = this.createBelongsToAccessorFor('reset', resetRepositoryGetter,);
    this.registerInclusionResolver('reset', this.reset.inclusionResolver);
    this.buyer = this.createBelongsToAccessorFor('buyer', userRepositoryGetter,);
    this.registerInclusionResolver('buyer', this.buyer.inclusionResolver);
  }

  async fulldata(): Promise<SaleReset[]> {
    return this.find({
      include:[
        {
          relation:'buyer'
        },
        {
          relation:'reset'
        }
      ]
    })
  }
}
