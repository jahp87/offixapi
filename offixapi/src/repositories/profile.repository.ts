import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {City, Profile, ProfileRelations, State, User} from '../models';
import {CityRepository} from './city.repository';
import {StateRepository} from './state.repository';
import {UserRepository} from './user.repository';

export class ProfileRepository extends DefaultCrudRepository<
  Profile,
  typeof Profile.prototype.id,
  ProfileRelations
> {

  public readonly user: BelongsToAccessor<User, typeof Profile.prototype.id>;

  public readonly state: BelongsToAccessor<State, typeof Profile.prototype.id>;

  public readonly city: BelongsToAccessor<City, typeof Profile.prototype.id>;

  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('StateRepository') protected stateRepositoryGetter: Getter<StateRepository>, @repository.getter('CityRepository') protected cityRepositoryGetter: Getter<CityRepository>,
  ) {
    super(Profile, dataSource);
    this.city = this.createBelongsToAccessorFor('city', cityRepositoryGetter,);
    this.registerInclusionResolver('city', this.city.inclusionResolver);
    this.state = this.createBelongsToAccessorFor('state', stateRepositoryGetter,);
    this.registerInclusionResolver('state', this.state.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }

  async fulldata(): Promise<Profile[]> {
    return this.find(
      {
        include: [
          {relation: 'city'},
          {
            relation: 'state',
            scope: {
              include: [
                {
                  relation: 'country'
                }
              ]
            }
          },
        ]
      }
    )
  }

  async fulldataId(id: string): Promise<Profile> {
    return this.findById(
      id,
      {
        include: [
          {relation: 'city'},
          {
            relation: 'state',
            scope: {
              include: [
                {
                  relation: 'country'
                }
              ]
            }
          },
        ]
      }
    )
  }
}
