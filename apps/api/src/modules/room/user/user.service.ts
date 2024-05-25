import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CrudService,
  InjectRepository,
  Repository,
  User,
} from '@yams-tactics/backend-database';
import { RegisterInput, RegisterResponse } from './dto/register.dto';

@Injectable()
export class UserService extends CrudService(User) {
  constructor(@InjectRepository(User) repository: Repository<User>) {
    super(repository);
  }

  public register({ name }: RegisterInput): RegisterResponse {
    const exists = this.repository.findOneBy('name', name);
    if (exists) {
      throw new BadRequestException(`${name} already registered`);
    }

    const user = this.createOne({ name });

    return user;
  }
}
