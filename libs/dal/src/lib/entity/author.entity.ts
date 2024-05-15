import { AuthorModel, BookModel } from '@example/domain';
import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Book } from './book.entity';

@Entity()
export class Author extends BaseEntity implements AuthorModel {
  @Column()
  name!: string;

  @OneToMany(() => Book, (book: Book) => book.author)
  books?: BookModel[];
}
