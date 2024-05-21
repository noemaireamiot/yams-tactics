import { Request } from 'express';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CrudController, User } from '@yams-tactics/backend-database';
import { UserService } from './user.service';
import { RegisterInput, RegisterResponse } from './dto/register.dto';
import { LoginInput, LoginResponse } from './dto/login.dto';
import { RefreshResponse } from './dto/refresh.dto';

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

  @Post('/register')
  register(@Body() dto: RegisterInput): RegisterResponse {
    console.info(dto);
    return this.service.register(dto);
  }

  @Post('/login')
  login(@Body() dto: LoginInput): LoginResponse {
    return this.service.login(dto);
  }

  @Post('/refresh')
  refresh(): RefreshResponse {
    return this.service.refresh();
  }

  @Get('/me')
  me(@Req() req: Request) {
    console.info(req);
  }
}
