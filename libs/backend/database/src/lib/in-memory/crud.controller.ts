import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { entities } from '../entity';
import { CrudService } from './crud.service';

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
  }

  let controller = CrudController;

  if (config.getOne) {
    class GetOneController extends controller {
      @Get(':id')
      getOne(@Param() id: string) {
        return this.service.getOne(id);
      }
    }
    controller = GetOneController;
  }

  if (config.getMany) {
    class getManyController extends controller {
      @Get()
      getMany() {
        return this.service.getMany();
      }
    }
    controller = getManyController;
  }

  if (config.createOne) {
    class createOneController extends controller {
      @Post()
      createOne(@Body() entity: Partial<InstanceType<EntityClass>>) {
        return this.service.createOne(entity);
      }
    }
    controller = createOneController;
  }

  if (config.updateOne) {
    class updateOneController extends controller {
      @Patch('/:id')
      updateOne(
        @Param() id: string,
        @Body() update: Partial<InstanceType<EntityClass>>
      ) {
        return this.service.updateOne(id, update);
      }
    }
    controller = updateOneController;
  }

  if (config.deleteOne) {
    class deleteOneController extends controller {
      @Patch('/:id')
      deleteOne(@Param() id: string) {
        return this.service.deleteOne(id);
      }
    }
    controller = deleteOneController;
  }

  return controller;
}
