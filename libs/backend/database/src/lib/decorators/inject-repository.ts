import { Inject } from '@nestjs/common';
import { entities } from '../entity';

export const repositoryToken = (entity: (typeof entities)[number]) =>
  `repository:${entity.name}`;

export const InjectRepository = (entity: (typeof entities)[number]) => {
  return Inject(repositoryToken(entity));
};
