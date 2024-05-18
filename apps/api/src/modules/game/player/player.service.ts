import { Injectable } from '@nestjs/common';
import {
  CrudService,
  Player,
  InjectRepository,
  Repository,
} from '@yams-tactics/backend-database';

@Injectable()
export class PlayerService extends CrudService(Player) {
  constructor(@InjectRepository(Player) repo: Repository<Player>) {
    super(repo);
  }
}
