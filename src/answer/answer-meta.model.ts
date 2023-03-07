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
import { Answer } from 'src/answer/answer.model';

interface AnswerMetaAttributes {
  id: number;
  person_id: number;
  answer_id: number;
  status: string;
}

@Table({
  tableName: 'answer-meta',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
})
export class AnswerMeta extends Model<
  AnswerMetaAttributes,
  Optional<AnswerMetaAttributes, 'id'>
> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id?: number;

  @Column({
    type: DataType.ENUM('none', 'upvote', 'downvote'),
    allowNull: false,
    defaultValue: 'none',
  })
  status: string;

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
