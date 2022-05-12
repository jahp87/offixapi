import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {OrderService, OrderServiceRelations, Service, User, Brand, Device} from '../models';
import {ServiceRepository} from './service.repository';
import {UserRepository} from './user.repository';
import {BrandRepository} from './brand.repository';
import {DeviceRepository} from './device.repository';

export class OrderServiceRepository extends DefaultCrudRepository<
  OrderService,
  typeof OrderService.prototype.id,
  OrderServiceRelations
> {

  public readonly customer: BelongsToAccessor<User, typeof OrderService.prototype.id>;

  public readonly business: BelongsToAccessor<User, typeof OrderService.prototype.id>;

  public readonly service: BelongsToAccessor<Service, typeof OrderService.prototype.id>;

  public readonly brand: BelongsToAccessor<Brand, typeof OrderService.prototype.id>;

  public readonly device: BelongsToAccessor<Device, typeof OrderService.prototype.id>;

  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource,
    @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
    @repository.getter('ServiceRepository') protected serviceRepositoryGetter: Getter<ServiceRepository>, @repository.getter('BrandRepository') protected brandRepositoryGetter: Getter<BrandRepository>, @repository.getter('DeviceRepository') protected deviceRepositoryGetter: Getter<DeviceRepository>,
  ) {
    super(OrderService, dataSource);
    this.device = this.createBelongsToAccessorFor('device', deviceRepositoryGetter,);
    this.registerInclusionResolver('device', this.device.inclusionResolver);
    this.brand = this.createBelongsToAccessorFor('brand', brandRepositoryGetter,);
    this.registerInclusionResolver('brand', this.brand.inclusionResolver);
    this.service = this.createBelongsToAccessorFor('service', serviceRepositoryGetter,);
    this.registerInclusionResolver('service', this.service.inclusionResolver);
    this.business = this.createBelongsToAccessorFor('business', userRepositoryGetter,);
    this.registerInclusionResolver('business', this.business.inclusionResolver);
    this.customer = this.createBelongsToAccessorFor('customer', userRepositoryGetter,);
    this.registerInclusionResolver('customer', this.customer.inclusionResolver);
  }

  async fulldata(): Promise<OrderService[]> {
    return this.find({
      include: [
        {
          relation: 'business'
        },
        {
          relation: 'customer'
        },
        {
          relation: 'service',
          scope: {
            include: [
              {
                relation: 'typeService'
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
            relation: 'customer'
          },
          {
            relation: 'service',
            scope: {
              include: [
                {
                  relation: 'typeService'
                }
              ]
            }
          }
        ]
      }
    )
  }
}
