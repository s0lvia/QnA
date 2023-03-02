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

interface QuestionAttributes {
  id: number;
  title: string;
  body: string;
  person_id: number;
}

@Table({
  tableName: 'question',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Question extends Model<
  QuestionAttributes,
  Optional<QuestionAttributes, 'id'>
> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id?: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  body: string;

  @ForeignKey(() => Person)
  @Column
  person_id: number;

  @BelongsTo(() => Person)
  author: Person;
}
