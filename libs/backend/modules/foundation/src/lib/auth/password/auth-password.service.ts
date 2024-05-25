import { Injectable } from '@nestjs/common';
import { AuthTokenService, UserAuthToken } from '../auth-token';
import {
  InjectRepository,
  Repository,
  User,
} from '@yams-tactics/backend-database';

@Injectable()
export class AuthPasswordService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private authTokenService: AuthTokenService
  ) {}

  public validateUser(name: string): User | null {
    return this.userRepo.findOneBy('name', name);
  }
  public loginUser(user: User): UserAuthToken {
    const userToken = this.authTokenService.generateUserAuthToken(user);

    return userToken;
  }
}
