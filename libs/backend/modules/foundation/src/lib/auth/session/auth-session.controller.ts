import { Controller, Res, Post, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CookieHelperService } from '../refresh-token';
import { UserAuthTokenDTO } from '../auth-token';
import { LogoutResponse } from './dto/logout-response.dto';
import { AuthSessionService } from './auth-session.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request, Response } from 'express';
import { UserModel } from '@yams-tactics/domain';

@ApiTags('auth session')
@Controller('auth/session')
export class AuthSessionController {
  constructor(
    private authSessionService: AuthSessionService,
    private cookieHelperService: CookieHelperService
  ) {}

  // Refresh -----------------------------------------------------------
  // User Refresh
  @ApiCreatedResponse({
    description: 'Refresh successful',
    type: UserAuthTokenDTO,
  })
  @Post('refresh')
  public async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ): Promise<UserAuthTokenDTO> {
    const refreshToken = this.cookieHelperService.getRefreshCookie(req);

    // try {
    const userToken = await this.authSessionService.refreshTokenUser(
      refreshToken
    );

    // Set new Refresh Token cookie
    this.cookieHelperService.setRefreshCookie(res, userToken);

    return userToken;
    // } catch (err) {
    // this.cookieHelperService.clearRefreshCookie(res);
    // throw err;
    // }
  }

  // Logout -----------------------------------------------------------
  // User Logout
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Logout successful',
    type: LogoutResponse,
  })
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  public async logoutUser(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ): Promise<LogoutResponse> {
    if (req.user)
      await this.authSessionService.logoutUser(req.user as UserModel);

    this.cookieHelperService.clearRefreshCookie(res);

    return { message: 'logout successful' };
  }
}
