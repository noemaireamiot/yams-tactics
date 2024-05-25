import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserDto } from '@yams-tactics/backend-dto';

export class LoginInput {
  @ApiProperty()
  name: string;
}

export class LoginResponse extends PickType(UserDto, ['id', 'refreshToken']) {
  @ApiProperty()
  accessToken: string;
}
