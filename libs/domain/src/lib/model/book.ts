import { AuthorModel } from './author';
import { BaseModel } from './base';

export interface BookModel extends BaseModel {
  title: string;

  authorId: string;
  author?: AuthorModel;

  releaseDate: Date;
}
