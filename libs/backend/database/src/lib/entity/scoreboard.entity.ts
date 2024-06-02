import {
  ScoreModel,
  ScoreTypeEnum,
  ScoreboardModel,
  scoreboardDefinitions,
} from '@yams-tactics/domain';
import { BaseEntity } from './base.entity';
import { v4 } from 'uuid';

export class Scoreboard extends BaseEntity implements ScoreboardModel {
  scores: ScoreModel[] = Object.keys(scoreboardDefinitions).map((type) => ({
    id: v4(),
    type: type as ScoreTypeEnum,
    value: null,
    done: false,
  }));

  constructor(props?: Partial<ScoreboardModel>) {
    super(props);
    Object.assign(this, props);
  }
}
