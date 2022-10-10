import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {Product, SellOrderDetails, SellOrderDetailsRelations, SellOrder} from '../models';
import {ProductRepository} from './product.repository';
import {SellOrderRepository} from './sell-order.repository';

export class SellOrderDetailsRepository extends DefaultCrudRepository<
  SellOrderDetails,
  typeof SellOrderDetails.prototype.id,
  SellOrderDetailsRelations
> {



  public readonly product: BelongsToAccessor<Product, typeof SellOrderDetails.prototype.id>;

  public readonly sellOrder: BelongsToAccessor<SellOrder, typeof SellOrderDetails.prototype.id>;

  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>, @repository.getter('SellOrderRepository') protected sellOrderRepositoryGetter: Getter<SellOrderRepository>,
  ) {
    super(SellOrderDetails, dataSource);
    this.sellOrder = this.createBelongsToAccessorFor('sellOrder', sellOrderRepositoryGetter,);
    this.registerInclusionResolver('sellOrder', this.sellOrder.inclusionResolver);
    this.product = this.createBelongsToAccessorFor('product', productRepositoryGetter,);
    this.registerInclusionResolver('product', this.product.inclusionResolver);
  }

  async fulldata(): Promise<SellOrderDetails[]> {
    return this.find({
      include:[
        {
          relation: 'product'
        }
      ]
    });
  }

  async fulldataById(id: string): Promise<SellOrderDetails> {
    return this.findById(id,{
      include:[
        {
          relation: 'product'
        }
      ]
    })
  }
}
