import { UserModel } from '@yams-tactics/domain';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto implements Pick<UserModel, 'id'> {
  @ApiProperty()
  declare id: string;
}
