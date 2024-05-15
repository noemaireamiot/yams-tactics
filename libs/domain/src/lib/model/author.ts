import { BaseModel } from './base';
import { BookModel } from './book';

export interface AuthorModel extends BaseModel {
  name: string;

  books?: BookModel[];
}
