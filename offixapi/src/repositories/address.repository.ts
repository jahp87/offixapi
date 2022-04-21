import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {Address, AddressRelations, City, Country, State, User} from '../models';
import {CityRepository} from './city.repository';
import {CountryRepository} from './country.repository';
import {StateRepository} from './state.repository';
import {UserRepository} from './user.repository';

export class AddressRepository extends DefaultCrudRepository<
  Address,
  typeof Address.prototype.id,
  AddressRelations
> {

  public readonly country: BelongsToAccessor<Country, typeof Address.prototype.id>;

  public readonly city: BelongsToAccessor<City, typeof Address.prototype.id>;

  public readonly state: BelongsToAccessor<State, typeof Address.prototype.id>;

  public readonly user: BelongsToAccessor<User, typeof Address.prototype.id>;

  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource, @repository.getter('CountryRepository') protected countryRepositoryGetter: Getter<CountryRepository>, @repository.getter('CityRepository') protected cityRepositoryGetter: Getter<CityRepository>, @repository.getter('StateRepository') protected stateRepositoryGetter: Getter<StateRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Address, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.state = this.createBelongsToAccessorFor('state', stateRepositoryGetter,);
    this.registerInclusionResolver('state', this.state.inclusionResolver);
    this.city = this.createBelongsToAccessorFor('city', cityRepositoryGetter,);
    this.registerInclusionResolver('city', this.city.inclusionResolver);
    this.country = this.createBelongsToAccessorFor('country', countryRepositoryGetter,);
    this.registerInclusionResolver('country', this.country.inclusionResolver);
  }

  async fulldata(): Promise<Address[]> {
    return this.find({
      include: [
        {relation: 'city'},
        {relation: 'state'},
        {relation: 'country'},
      ]
    })
  }

  async fulldataById(id: string): Promise<Address> {
    return this.findById(
      id,
      {
        include: [
          {relation: 'city'},
          {relation: 'state'},
          {relation: 'country'},
        ]
      }

    )
  }

}
