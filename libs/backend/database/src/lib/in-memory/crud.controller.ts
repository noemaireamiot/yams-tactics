import { Controller, Get, Param, Post } from '@nestjs/common';
import { entities } from '../entity';
import { CrudService } from './crud.service';

export function CrudController<EntityClass extends (typeof entities)[number]>(
  entity: EntityClass
) {
  @Controller(entity.name.toLowerCase())
  class CrudController {
    service: InstanceType<ReturnType<typeof CrudService<typeof entity>>>;
    constructor(
      service: InstanceType<ReturnType<typeof CrudService<typeof entity>>>
    ) {
      this.service = service;
    }

    @Get()
    getMany() {
      return this.service.getMany();
    }

    @Get('/:id')
    getOne(@Param() id: string) {
      return this.service.getOne(id);
    }

    @Post()
    create() {
      return this.service.create();
    }
  }

  return CrudController;
}
