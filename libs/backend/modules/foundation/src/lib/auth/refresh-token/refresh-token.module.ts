import { Module } from '@nestjs/common';

import { RefreshTokenService } from './refresh-token.service';
import { CookieHelperService } from './cookie-helper.service';

@Module({
  providers: [RefreshTokenService, CookieHelperService],
  exports: [RefreshTokenService, CookieHelperService],
})
export class RefreshTokenModule {}
