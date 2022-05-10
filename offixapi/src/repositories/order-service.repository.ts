import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {Device, OrderService, OrderServiceRelations, User} from '../models';
import {DeviceRepository} from './device.repository';
import {UserRepository} from './user.repository';

export class OrderServiceRepository extends DefaultCrudRepository<
  OrderService,
  typeof OrderService.prototype.id,
  OrderServiceRelations
> {

  public readonly consumer: BelongsToAccessor<User, typeof OrderService.prototype.id>;

  public readonly business: BelongsToAccessor<User, typeof OrderService.prototype.id>;

  public readonly device: BelongsToAccessor<Device, typeof OrderService.prototype.id>;

  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('DeviceRepository') protected deviceRepositoryGetter: Getter<DeviceRepository>,
  ) {
    super(OrderService, dataSource);
    this.device = this.createBelongsToAccessorFor('device', deviceRepositoryGetter,);
    this.registerInclusionResolver('device', this.device.inclusionResolver);
    this.business = this.createBelongsToAccessorFor('business', userRepositoryGetter,);
    this.registerInclusionResolver('business', this.business.inclusionResolver);
    this.consumer = this.createBelongsToAccessorFor('consumer', userRepositoryGetter,);
    this.registerInclusionResolver('consumer', this.consumer.inclusionResolver);
  }

  async fulldata(): Promise<OrderService[]> {
    return this.find({
      include: [
        {
          relation: 'business'
        },
        {
          relation: 'consumer'
        },
        {
          relation: 'device',
          scope: {
            include: [
              {
                relation: 'model',
                scope: {
                  include: [
                    {
                      relation: 'brand'
                    }
                  ]
                }
              }
            ]
          }
        }
      ]
    });
  }

  async fulldataById(id: string): Promise<OrderService> {
    return this.findById(
      id,
      {
        include: [
          {
            relation: 'business'
          },
          {
            relation: 'consumer'
          },
          {
            relation: 'device',
            scope: {
              include: [
                {
                  relation: 'model',
                  scope: {
                    include: [
                      {
                        relation: 'brand'
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    )
  }
}
