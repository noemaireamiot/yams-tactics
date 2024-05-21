import { Injectable } from '@nestjs/common';
import { entities } from '../entity';
import { Repository } from './repository';
import { InjectRepository } from '../decorators';

export function CrudService<EntityClass extends (typeof entities)[number]>(
  entity: EntityClass
) {
  @Injectable()
  class CrudService {
    constructor(
      @InjectRepository(entity)
      public repository: Repository<InstanceType<EntityClass>>
    ) {}

    has(...[id]: Parameters<InstanceType<typeof Repository>['findOne']>) {
      return this.repository.has(id);
    }

    getMany() {
      return this.repository.store;
    }

    getOne(...[id]: Parameters<InstanceType<typeof Repository>['findOne']>) {
      return this.repository.findOneOrFail(id);
    }

    createOne(e?: Partial<InstanceType<EntityClass>>) {
      return this.repository.createOne(
        new entity(e) as InstanceType<EntityClass>
      );
    }

    updateOne(
      ...[id, e]: Parameters<InstanceType<typeof Repository>['updateOne']>
    ) {
      return this.repository.updateOne(id, e as InstanceType<EntityClass>);
    }

    deleteOne([id]: Parameters<InstanceType<typeof Repository>['findOne']>) {
      return this.repository.deleteOne(id);
    }
  }

  return CrudService;
}
