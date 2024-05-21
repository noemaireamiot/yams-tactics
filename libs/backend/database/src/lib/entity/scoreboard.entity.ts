import { ScoreModel, ScoreboardModel } from '@yams-tactics/domain';
import { BaseEntity } from './base.entity';

export class Scoreboard extends BaseEntity implements ScoreboardModel {
  scores: ScoreModel[] = [];

  constructor(props?: Partial<ScoreboardModel>) {
    super(props);
    Object.assign(this, props);
  }
}
