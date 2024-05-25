import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { RefreshTokenModule } from '../refresh-token';
import { AuthTokenModule } from '../auth-token';
import { AuthPasswordService } from './auth-password.service';
import { LocalStrategy } from './local.strategy';
import { AuthPasswordController } from './auth-password.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    RefreshTokenModule,
    AuthTokenModule,
  ],
  providers: [AuthPasswordService, LocalStrategy],
  controllers: [AuthPasswordController],
  exports: [],
})
export class AuthPasswordModule {}
