import { ApiProperty } from '@nestjs/swagger';

export class LogoutResponse {
  @ApiProperty()
  declare message: string;
}
