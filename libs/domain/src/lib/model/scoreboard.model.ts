import { BaseModel } from './base.model';
import { ScoreModel } from './score.model';

export interface ScoreboardModel extends BaseModel {
  scores: ScoreModel[];
}
