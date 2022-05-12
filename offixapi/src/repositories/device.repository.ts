import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {OffixdbDataSource} from '../datasources';
import {Device, DeviceRelations} from '../models';
export class DeviceRepository extends DefaultCrudRepository<
  Device,
  typeof Device.prototype.id,
  DeviceRelations
> {


  constructor(
    @inject('datasources.offixdb') dataSource: OffixdbDataSource,

  ) {
    super(Device, dataSource);

  }

  async fulldata(): Promise<Device[]> {
    return this.find({

    });
  }

  async fulldataById(id: string): Promise<Device> {
    return this.findById(
      id,
      {
      }
    );
  }
}
