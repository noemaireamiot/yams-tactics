import { AuthorModel, BookModel } from '@example/domain';
import { BaseEntity } from './base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Author } from './author.entity';

@Entity()
export class Book extends BaseEntity implements BookModel {
  @Column({ name: 'author_id' })
  authorId!: string;
  @ManyToOne(() => Author, (author) => author.books, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'author_id' })
  author?: AuthorModel;

  @Column({})
  title!: string;

  @Column({ name: 'release_date' })
  releaseDate!: Date;
}
