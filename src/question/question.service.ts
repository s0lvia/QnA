import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Person } from 'src/auth/person.model';
import { CreateQuestionDto } from './question.dto';
import { Question } from './question.model';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question) private readonly questionModel: typeof Question,
  ) {}

  fetchQuestionAndAuthor(questionId: number) {
    return this.questionModel.findByPk(questionId, {
      attributes: ['id', 'title', 'body'],
      include: [
        {
          model: Person,
          attributes: ['id', 'first_name', 'last_name'],
        },
      ],
    });
  }

  async create(personId: number, data: CreateQuestionDto) {
    const created = await this.questionModel.create({
      ...data,
      person_id: personId,
    });

    const qandAuthor = await this.fetchQuestionAndAuthor(created.id);

    return qandAuthor;
  }

  async fetchAll() {
    const questions = await this.questionModel.findAll({
      attributes: ['id', 'title', 'body'],
      include: [
        {
          model: Person,
          attributes: ['id', 'first_name', 'last_name'],
        },
      ],
    });

    return questions;
  }
}
