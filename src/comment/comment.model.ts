import { Optional } from 'sequelize';
import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Person } from 'src/auth/person.model';
import { Question } from 'src/question/question.model';
import { Answer } from 'src/answer/answer.model';

interface CommentAttributes {
  id: number;
  entity_id: number;
  entity: string;
  body: string;
}

@Table({
  tableName: 'answer',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
})
export class Comment extends Model<
  CommentAttributes,
  Optional<CommentAttributes, 'id'>
> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id?: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  body: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  entity: string;

  @ForeignKey(() => Person)
  @Column
  person_id: number;

  @ForeignKey(() => Question)
  @Column
  question_id: number;

  @ForeignKey(() => Answer)
  @Column
  answer_id: number;

  @BelongsTo(() => Person)
  author: Person;
}
