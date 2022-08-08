import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {Atribute, AtributeRelations, Values} from '../models';
import {ValuesRepository} from './values.repository';

export class AtributeRepository extends DefaultCrudRepository<
  Atribute,
  typeof Atribute.prototype.id,
  AtributeRelations
> {

  public readonly values: HasManyRepositoryFactory<Values, typeof Atribute.prototype.id>;

  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource, @repository.getter('ValuesRepository') protected valuesRepositoryGetter: Getter<ValuesRepository>,
  ) {
    super(Atribute, dataSource);
    this.values = this.createHasManyRepositoryFactoryFor('values', valuesRepositoryGetter,);
    this.registerInclusionResolver('values', this.values.inclusionResolver);
  }

  async fulldataById(id: string): Promise<Atribute> {
    return this.findById(
      id,
      {
        include: [
          {relation: 'values'}
        ]
      }

    )
  }
}
