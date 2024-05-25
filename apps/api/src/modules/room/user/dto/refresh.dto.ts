import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserDto } from '@yams-tactics/backend-dto';

export class RefreshInput {
  @ApiProperty()
  refreshToken: string;
}

export class RefreshResponse extends PickType(UserDto, ['id', 'refreshToken']) {
  @ApiProperty()
  accessToken: string;
}
