import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserDto } from '@yams-tactics/backend-dto';

export class RegisterInput {
  @ApiProperty()
  name: string;
}

export class RegisterResponse extends PickType(UserDto, ['id']) {
  @ApiProperty()
  token: string;
}
