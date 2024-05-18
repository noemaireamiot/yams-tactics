import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CrudService,
  InjectRepository,
  Repository,
  User,
} from '@yams-tactics/backend-database';
import { JwtService } from '@nestjs/jwt';
import { RegisterInput, RegisterResponse } from './dto/register.dto';
import { LoginInput, LoginResponse } from './dto/login.dto';
import { UserModel } from '@yams-tactics/domain';
import { RefreshResponse } from './dto/refresh.dto';

@Injectable()
export class UserService extends CrudService(User) {
  constructor(
    @InjectRepository(User) repository: Repository<User>,
    private jwtService: JwtService
  ) {
    super(repository);
  }

  private generateJwt({ id }: UserModel): string {
    return this.jwtService.sign(JSON.stringify({ id }));
  }

  public register({ name }: RegisterInput): RegisterResponse {
    const exists = this.repository.findOneBy('name', name);
    if (exists) {
      throw new BadRequestException(`${name} already registered`);
    }

    const user = this.createOne({ name });

    return {
      ...user,
      token: this.generateJwt(user),
    };
  }

  public login({ name }: LoginInput): LoginResponse {
    const user = this.repository.findOneBy('name', name);

    if (!user) throw new BadRequestException(`user: ${name} not found`);

    return {
      ...user,
      token: this.generateJwt(user),
    };
  }

  public refresh(): RefreshResponse {
    // decode jwt, retrieve user, return new token
    // const payload = this.jwtService.decode(token)

    // const user = this.repository.findOneBy('token', token);

    // if (!user) throw new BadRequestException(`user: ${name} not found`);

    return {
      token: '',
    };
  }
}
