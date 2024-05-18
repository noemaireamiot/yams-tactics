import { Injectable } from '@nestjs/common';
import {
  CrudService,
  Game,
  InjectRepository,
  Repository,
} from '@yams-tactics/backend-database';

@Injectable()
export class GameService extends CrudService(Game) {
  constructor(@InjectRepository(Game) repo: Repository<Game>) {
    super(repo);
  }
}
