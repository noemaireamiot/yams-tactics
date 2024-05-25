import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginPasswordInput {
  @ApiProperty()
  @IsNotEmpty()
  declare name: string;
}
