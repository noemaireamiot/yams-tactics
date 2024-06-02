import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CrudController, User } from '@yams-tactics/backend-database';
import { UserService } from './user.service';
import { RegisterInput, RegisterResponse } from './dto/register.dto';
import { CurrentUser } from '@yams-tactics/backend-modules-foundation';
import { UserModel } from '@yams-tactics/domain';

@Controller('user')
export class UserController extends CrudController(User, {
  createOne: false,
  updateOne: false,
  getMany: false,
  getOne: false,
  deleteOne: false,
}) {
  constructor(public service: UserService) {
    super(service);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/register')
  public register(@Body() input: RegisterInput): RegisterResponse {
    return this.service.register(input);
  }

  @Get('/me')
  me(@CurrentUser() user: UserModel) {
    return user;
  }
}
