import { RepositoryModel } from '../base';
import { Entity, entities } from '../entity';

export class Repository<E extends Entity> implements RepositoryModel<E> {
  private _name: string;
  private _store: Record<string, E>;

  constructor(entity: (typeof entities)[number]) {
    this._store = {};
    this._name = entity.name;
  }

  get store() {
    return this._store;
  }

  get name() {
    return this._name;
  }

  has(id: string) {
    return id in this.store;
  }

  createOne(entity: E) {
    this.store[entity.id] = entity;

    return entity;
  }

  findOne(id: string) {
    return this.store[id] ?? null;
  }

  findOneBy<K extends keyof E>(key: K, value: E[K]) {
    return Object.values(this.store).find((entity) => entity[key] === value);
  }

  findOneOrFail(id: string) {
    const value = this.findOne(id);
    if (!value) {
      throw new Error(`Entity ${this.name}} with id: ${id} not found`);
    }

    return value;
  }

  deleteOne(id: string) {
    const value = this.findOneOrFail(id);
    delete this.store[id];
    return value;
  }

  updateOne(id: string, update: Partial<E>) {
    const value = this.findOneOrFail(id);
    const updatedValue = { ...value, ...update };

    this.store[id] = updatedValue;

    return updatedValue;
  }
}
