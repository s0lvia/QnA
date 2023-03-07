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
import { Answer } from 'src/answer/answer.model';

interface AnswerMetaAttributes {
  id: number;
  person_id: number;
  answer_id: number;
}

@Table({
  tableName: 'answer-meta',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
})
export class AnswerMeta extends Model<
  AnswerMetaAttributes,
  Optional<AnswerMetaAttributes, 'id'>
> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id?: number;

  @ForeignKey(() => Person)
  @Column
  person_id: number;

  @ForeignKey(() => Answer)
  @Column
  answer_id: number;

  @BelongsTo(() => Person)
  author: Person;

  @BelongsTo(() => Answer)
  answer: Answer;
}
