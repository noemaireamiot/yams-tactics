import { Global, Module } from '@nestjs/common';
import { repositoryToken } from '../decorators';
import { Repository } from './repository';
import { entities } from '../entity';

const providers = entities.map((entity) => {
  return {
    provide: repositoryToken(entity),
    useFactory: () => new Repository(entity),
  };
});

@Global()
@Module({
  controllers: [],
  providers,
  exports: providers,
})
export class EntitiesModule {}
