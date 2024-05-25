import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserAuthToken } from './user-auth-token';

export class UserAuthTokenDTO extends UserAuthToken {
  @ApiProperty()
  declare accessToken: string;

  @ApiPropertyOptional()
  declare refreshToken?: string;

  @ApiProperty()
  declare userId: string;

  @ApiProperty()
  declare expiresAt: Date;

  @ApiPropertyOptional()
  declare refreshExpiresAt?: Date;
}
