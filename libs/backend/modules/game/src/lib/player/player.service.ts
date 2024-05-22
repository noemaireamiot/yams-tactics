import { Injectable } from '@nestjs/common';
import {
  Player,
  InjectRepository,
  Repository,
} from '@yams-tactics/backend-database';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player) public playerRepo: Repository<Player>
  ) {}
}
