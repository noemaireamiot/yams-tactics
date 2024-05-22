import { Injectable } from '@nestjs/common';
import {
  InjectRepository,
  Repository,
  User,
} from '@yams-tactics/backend-database';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>
  ) {}
}
