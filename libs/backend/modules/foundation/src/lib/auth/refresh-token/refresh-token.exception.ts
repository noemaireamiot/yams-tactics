import { BadRequestException, HttpStatus } from '@nestjs/common';

const INVALID_REFRESH_TOKEN_ERROR = 'INVALID_REFRESH_TOKEN_ERROR';

export class InvalidRefreshTokenException extends BadRequestException {
  constructor() {
    super({
      code: INVALID_REFRESH_TOKEN_ERROR,
      status: HttpStatus.BAD_REQUEST,
      message: 'Invalid refresh token',
    });
  }
}
