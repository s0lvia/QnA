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

  @ForeignKey(() => Person)
  @Column
  person_id: number;

  @ForeignKey(() => Question)
  @Column
  question_id: number;

  @BelongsTo(() => Person)
  author: Person;
}
