import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {CatShipping, CatShippingRelations, Province, City} from '../models';
import {ProvinceRepository} from './province.repository';
import {CityRepository} from './city.repository';

export class CatShippingRepository extends DefaultCrudRepository<
  CatShipping,
  typeof CatShipping.prototype.id,
  CatShippingRelations
> {

  public readonly province: BelongsToAccessor<Province, typeof CatShipping.prototype.id>;

  public readonly city: BelongsToAccessor<City, typeof CatShipping.prototype.id>;

  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource, @repository.getter('ProvinceRepository') protected provinceRepositoryGetter: Getter<ProvinceRepository>, @repository.getter('CityRepository') protected cityRepositoryGetter: Getter<CityRepository>,
  ) {
    super(CatShipping, dataSource);
    this.city = this.createBelongsToAccessorFor('city', cityRepositoryGetter,);
    this.registerInclusionResolver('city', this.city.inclusionResolver);
    this.province = this.createBelongsToAccessorFor('province', provinceRepositoryGetter,);
    this.registerInclusionResolver('province', this.province.inclusionResolver);
  }
}
