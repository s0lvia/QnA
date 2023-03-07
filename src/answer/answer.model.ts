import { Optional } from 'sequelize';
import {
  AutoIncrement,
  BelongsTo,
  HasMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Person } from 'src/auth/person.model';
import { Question } from 'src/question/question.model';
import { Comment } from 'src/comment/comment.model';
import { AnswerMeta } from './answer-meta.model';
interface AnswerAttributes {
  id: number;
  body: string;
  person_id: number;
  question_id: number;
}

@Table({
  tableName: 'answer',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
})
export class Answer extends Model<
  AnswerAttributes,
  Optional<AnswerAttributes, 'id'>
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
    type: DataType.NUMBER,
    allowNull: true,
  })
  upvote: number;

  @Column({
    type: DataType.NUMBER,
    allowNull: true,
  })
  downvote: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
  })
  isAccepted: boolean;

  @ForeignKey(() => Person)
  @Column
  person_id: number;

  @ForeignKey(() => Question)
  @Column
  question_id: number;

  @BelongsTo(() => Person)
  author: Person;

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => AnswerMeta)
  answerMeta: AnswerMeta;
}
