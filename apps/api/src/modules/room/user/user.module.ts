import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '@yams-tactics/backend-modules-foundation';

@Module({
  imports: [AuthModule, JwtModule.register({ secret: process.env.JWT_SECRET })],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
