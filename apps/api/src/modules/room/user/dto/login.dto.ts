import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '@yams-tactics/backend-dto';

export class LoginInput {
  @ApiProperty()
  name: string;
}

export class LoginResponse extends UserDto {
  @ApiProperty()
  token: string;
}
