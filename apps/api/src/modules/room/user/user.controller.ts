import { Request } from 'express';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { CrudController, User } from '@yams-tactics/backend-database';
import { UserService } from './user.service';
import { RegisterInput, RegisterResponse } from './dto/register.dto';
// import { LoginInput, LoginResponse } from './dto/login.dto';
// import { RefreshInput, RefreshResponse } from './dto/refresh.dto';

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

  // @Post('/register')
  // register(@Body() dto: RegisterInput): RegisterResponse {
  //   console.info(dto);
  //   return this.service.register(dto);
  // }

  // @Post('/login')
  // login(@Body() dto: LoginInput): LoginResponse {
  //   return this.service.login(dto);
  // }

  // @Post('/refresh')
  // refresh(@Body() dto: RefreshInput): RefreshResponse {
  //   return this.service.refresh(dto);
  // }

  @Get('/me')
  me(@Req() req: Request) {
    console.info(req);
  }
}
