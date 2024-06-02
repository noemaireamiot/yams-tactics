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

  has(id: string | null | undefined) {
    if (id === undefined || id === null) return false;
    return id in this.store;
  }

  createOne(entity: E) {
    this.store[entity.id] = entity;

    return entity;
  }

  findOne(id: string | null | undefined) {
    return id ? this.store[id] ?? null : null;
  }

  findOneBy<K extends keyof E>(key: K, value: E[K]) {
    return (
      Object.values(this.store).find((entity) => entity[key] === value) ?? null
    );
  }

  findOneWhere(where: (e: E) => boolean) {
    return Object.values(this.store).find(where) ?? null;
  }

  findOneOrFail(id: string | null | undefined) {
    const value = this.findOne(id);
    if (!value) {
      throw new Error(`Entity ${this.name} with id: ${id} not found`);
    }

    return value;
  }

  deleteOne(id: string | null | undefined) {
    const value = this.findOneOrFail(id);
    delete this.store[value.id];
    return value;
  }

  updateOne(id: string | null | undefined, update: Partial<E>) {
    const value = this.findOneOrFail(id);
    const updatedValue = { ...value, ...update };

    this.store[value.id] = updatedValue;

    return updatedValue;
  }
}
