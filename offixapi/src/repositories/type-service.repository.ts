import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {Service, TypeService, TypeServiceRelations} from '../models';
import {ServiceRepository} from './service.repository';

export class TypeServiceRepository extends DefaultCrudRepository<
  TypeService,
  typeof TypeService.prototype.id,
  TypeServiceRelations
> {

  public readonly services: HasManyRepositoryFactory<Service, typeof TypeService.prototype.id>;

  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource, @repository.getter('ServiceRepository') protected serviceRepositoryGetter: Getter<ServiceRepository>,
  ) {
    super(TypeService, dataSource);
    this.services = this.createHasManyRepositoryFactoryFor('services', serviceRepositoryGetter,);
    this.registerInclusionResolver('services', this.services.inclusionResolver);
  }

  async fulldata(): Promise<TypeService[]> {
    return this.find({
      include: [
        {
          relation: 'services'
        }
      ]

    })
  }

  async fulldataById(id: string): Promise<TypeService> {
    return this.findById(
      id,
      {
        include: [
          {
            relation: 'services'
          }
        ]
      }
    )
  }
}
