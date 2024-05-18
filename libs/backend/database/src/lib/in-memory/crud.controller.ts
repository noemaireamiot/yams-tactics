import {
  Body,
  Controller,
  Param,
  Post,
  RequestMapping,
  RequestMethod,
} from '@nestjs/common';
import { entities } from '../entity';
import { CrudService } from './crud.service';

function ActionableRoute({
  method = RequestMethod.GET,
  path = '',
  active = true,
}: {
  method?: RequestMethod;
  path?: string;
  active?: boolean;
}) {
  if (active) return RequestMapping({ path, method });
  return () => {};
}

export function CrudController<EntityClass extends (typeof entities)[number]>(
  entity: EntityClass,
  _config?: Partial<{
    getOne: boolean;
    getMany: boolean;
    createOne: boolean;
    updateOne: boolean;
    deleteOne: boolean;
  }>
) {
  const config = {
    getOne: true,
    getMany: true,
    createOne: true,
    updateOne: true,
    deleteOne: true,
    ..._config,
  };

  @Controller(entity.name.toLowerCase())
  class CrudController {
    constructor(
      public service: InstanceType<
        ReturnType<typeof CrudService<typeof entity>>
      >
    ) {}

    @ActionableRoute({ active: config.getMany })
    getMany() {
      return this.service.getMany();
    }

    @ActionableRoute({
      path: '/:id',
      active: config.getOne,
    })
    getOne(@Param() id: string) {
      return this.service.getOne(id);
    }

    @ActionableRoute({
      method: RequestMethod.POST,
      active: config.createOne,
    })
    @Post()
    createOne(@Body() entity: Partial<InstanceType<EntityClass>>) {
      return this.service.createOne(entity);
    }

    @ActionableRoute({
      method: RequestMethod.PATCH,
      path: '/:id',
      active: config.updateOne,
    })
    updateOne(
      @Param() id: string,
      @Body() update: Partial<InstanceType<EntityClass>>
    ) {
      return this.service.updateOne(id, update);
    }

    @ActionableRoute({
      method: RequestMethod.DELETE,
      path: '/:id',
      active: config.deleteOne,
    })
    deleteOne(@Param() id: string) {
      return this.service.deleteOne(id);
    }
  }

  return CrudController;
}
