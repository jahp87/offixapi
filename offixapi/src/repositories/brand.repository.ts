import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {Brand, BrandRelations} from '../models';


export class BrandRepository extends DefaultCrudRepository<
  Brand,
  typeof Brand.prototype.id,
  BrandRelations
> {



  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource,

  ) {
    super(Brand, dataSource);

  }

  async fulldata(): Promise<Brand[]> {
    return this.find({

    })
  }

  async fulldataById(id: string): Promise<Brand> {
    return this.findById(
      id,
      {

      }
    )
  }
}
