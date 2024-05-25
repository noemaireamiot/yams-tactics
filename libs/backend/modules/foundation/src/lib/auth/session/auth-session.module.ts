import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { RefreshTokenModule } from '../refresh-token';
import { AuthTokenModule } from '../auth-token';
import { AuthSessionService } from './auth-session.service';
import { AuthSessionController } from './auth-session.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    RefreshTokenModule,
    AuthTokenModule,
  ],
  providers: [AuthSessionService, JwtStrategy],
  controllers: [AuthSessionController],
})
export class AuthSessionModule {}
