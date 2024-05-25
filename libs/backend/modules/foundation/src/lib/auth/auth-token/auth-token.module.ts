import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenModule } from '../refresh-token';
import { AuthTokenService } from './auth-token.service';
import { ACCESS_TOKEN_EXPIRATION_SECONDS } from '@yams-tactics/domain';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: ACCESS_TOKEN_EXPIRATION_SECONDS,
        },
      }),
    }),
    RefreshTokenModule,
  ],
  providers: [AuthTokenService],
  exports: [AuthTokenService],
})
export class AuthTokenModule {}
