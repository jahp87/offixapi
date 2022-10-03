import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {OrderService, SellOrder, SellOrderRelations, User} from '../models';
import {OrderServiceRepository} from './order-service.repository';
import {UserRepository} from './user.repository';

export class SellOrderRepository extends DefaultCrudRepository<
  SellOrder,
  typeof SellOrder.prototype.id,
  SellOrderRelations
> {


  public readonly order: BelongsToAccessor<OrderService, typeof SellOrder.prototype.id>;

  public readonly client: BelongsToAccessor<User, typeof SellOrder.prototype.id>;

  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource, @repository.getter('OrderServiceRepository') protected orderServiceRepositoryGetter: Getter<OrderServiceRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(SellOrder, dataSource);
    this.client = this.createBelongsToAccessorFor('client', userRepositoryGetter,);
    this.registerInclusionResolver('client', this.client.inclusionResolver);
    this.order = this.createBelongsToAccessorFor('order', orderServiceRepositoryGetter,);
    this.registerInclusionResolver('order', this.order.inclusionResolver);
  }

  async fulldata(): Promise<SellOrder[]>{
    return this.find({
      include:[
        {
          relation: 'client'
        },
        {
          relation:'order'
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
          relation:'order'
        }
      ]
    });
  }
}
