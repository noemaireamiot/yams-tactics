import { Module } from '@nestjs/common';
import { AuthPasswordModule } from './password';
import { AuthSessionModule } from './session/auth-session.module';

@Module({
  imports: [AuthPasswordModule, AuthSessionModule],
})
export class AuthModule {}
