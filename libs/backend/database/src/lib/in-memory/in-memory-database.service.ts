import { Injectable } from '@nestjs/common';
import { BaseDatabaseService } from '../base';
import { Entity, entities } from '../entity';
import { Repository } from './repository';

@Injectable()
export class InMemoryDatabaseService extends BaseDatabaseService {
  private repositories: Record<
    (typeof entities)[number]['name'],
    Repository<Entity>
  > = {};

  constructor() {
    super();
    this.repositories = entities.reduce(
      (acc, entity) => ({
        ...acc,
        [entity.name]: new Repository(entity),
      }),
      {}
    );
  }

  override getRepository<E extends (typeof entities)[number]>(
    entity: E
  ): Repository<InstanceType<E>> {
    return this.repositories[entity.name] as Repository<InstanceType<E>>;
  }
}
