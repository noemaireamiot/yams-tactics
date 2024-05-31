import {
  Controller,
  Res,
  Post,
  UseGuards,
  Body,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CookieHelperService } from '../refresh-token';
import { UserAuthTokenDTO } from '../auth-token';
import { LoginPasswordInput } from './dto/login-password.input';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthPasswordService } from './auth-password.service';
import { UserModel } from '@yams-tactics/domain';

// @TODO - Effectively add password
// Decline this controller for other usage (google sso, anonymous, ...)
@ApiTags('auth password')
@Controller('auth')
export class AuthPasswordController {
  constructor(
    private authPasswordService: AuthPasswordService,
    private cookieHelperService: CookieHelperService
  ) {}

  @ApiCreatedResponse({
    description: 'Authentication successful',
    type: UserAuthTokenDTO,
  })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  public login(
    @Body() loginPasswordInput: LoginPasswordInput,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ): UserAuthTokenDTO {
    if (req.user) {
      const userToken = this.authPasswordService.loginUser(
        req.user as UserModel
      );

      this.cookieHelperService.setRefreshCookie(res, userToken);

      return userToken;
    }

    throw new UnauthorizedException();
  }
}
