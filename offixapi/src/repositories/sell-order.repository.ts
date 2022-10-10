import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {SellOrder, SellOrderDetails, SellOrderRelations, User} from '../models';
import {OrderServiceRepository} from './order-service.repository';
import {SellOrderDetailsRepository} from './sell-order-details.repository';
import {UserRepository} from './user.repository';

export class SellOrderRepository extends DefaultCrudRepository<
  SellOrder,
  typeof SellOrder.prototype.id,
  SellOrderRelations
> {


  public readonly client: BelongsToAccessor<User, typeof SellOrder.prototype.id>;

  public readonly items: HasManyRepositoryFactory<SellOrderDetails, typeof SellOrder.prototype.id>;

  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource, @repository.getter('OrderServiceRepository') protected orderServiceRepositoryGetter: Getter<OrderServiceRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('SellOrderDetailsRepository') protected sellOrderDetailsRepositoryGetter: Getter<SellOrderDetailsRepository>,
  ) {
    super(SellOrder, dataSource);
    this.items = this.createHasManyRepositoryFactoryFor('items', sellOrderDetailsRepositoryGetter,);
    this.registerInclusionResolver('items', this.items.inclusionResolver);
    this.client = this.createBelongsToAccessorFor('client', userRepositoryGetter,);
    this.registerInclusionResolver('client', this.client.inclusionResolver);

  }

  async fulldata(): Promise<SellOrder[]>{
    return this.find({
      include:[
        {
          relation: 'client'
        },
        {
          relation:'items'
        }
      ]
    });
  }

 async fulldataById(id: string): Promise<SellOrder> {
    return this.findById(id,{
      include:[
        {
          relation: 'client'
        },
        {
          relation:'items'
        }
      ]
    });
  }
}
