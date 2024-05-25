import { BaseEntity } from './base.entity';

export class RefreshToken extends BaseEntity {
  declare refreshToken: string;
  declare expiresAt: Date;
  declare userId: string;

  constructor(props?: Partial<RefreshToken>) {
    super(props);
    Object.assign(this, props);
  }
}
