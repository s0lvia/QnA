import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Person } from 'src/auth/person.model';
import { Comment } from 'src/comment/comment.model';
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

  async update(id: number, data: Partial<CreateQuestionDto>, personId: number) {
    await this.questionModel.update(
      { ...data },
      { where: { id: id, person_id: personId }, returning: true },
    );

    const qandAuthor = await this.fetchQuestionAndAuthor(id);
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
        {
          model: Comment,
          attributes: ['id', 'entity', 'entity_id', 'body'],
        },
      ],
    });

    return questions;
  }

  async deleteQuestion(id: number, personId: number) {
    await this.questionModel.destroy({
      where: {
        id: id,
        person_id: personId,
      },
    });
  }
}
