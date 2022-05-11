import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {Service, ServiceRelations, TypeService} from '../models';
import {TypeServiceRepository} from './type-service.repository';

export class ServiceRepository extends DefaultCrudRepository<
  Service,
  typeof Service.prototype.id,
  ServiceRelations
> {

  public readonly typeService: BelongsToAccessor<TypeService, typeof Service.prototype.id>;


  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource, @repository.getter('TypeServiceRepository') protected typeServiceRepositoryGetter: Getter<TypeServiceRepository>
  ) {
    super(Service, dataSource);
    this.typeService = this.createBelongsToAccessorFor('typeService', typeServiceRepositoryGetter,);
    this.registerInclusionResolver('typeService', this.typeService.inclusionResolver);
  }

  async fulldata(): Promise<Service[]> {
    return this.find(
      {
        include: [
          {
            relation: 'typeService'
          }
        ]
      }
    )
  }

  async fulldataById(id: string): Promise<Service> {
    return this.findById(
      id,
      {
        include: [
          {
            relation: 'typeService'
          }
        ]
      }
    )
  }


}
