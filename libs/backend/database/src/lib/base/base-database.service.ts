import { Entity, entities } from '../entity';

export interface RepositoryModel<E extends Entity> {
  findOne: (id: string) => E | null;
  findOneOrFail: (id: string) => E;
  createOne: (entity: E) => E;
  updateOne: (id: string, update: Partial<E>) => E;
  deleteOne: (id: string) => E;
}

export abstract class BaseDatabaseService {
  abstract getRepository<E extends (typeof entities)[number]>(
    entity: E
  ): RepositoryModel<InstanceType<E>>;
}
