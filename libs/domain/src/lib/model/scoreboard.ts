import { BaseModel } from './base';
import { ScoreModel } from './score';

export interface ScoreboardModel extends BaseModel {
  scores: ScoreModel;
}
