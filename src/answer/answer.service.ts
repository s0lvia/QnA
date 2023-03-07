import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Answer } from './answer.model';
import { CreateAnswerDto } from './answer.dto';
import { Person } from 'src/auth/person.model';
import { Comment } from 'src/comment/comment.model';

@Injectable()
export class AnswerService {
  constructor(
    @InjectModel(Answer) private readonly answerModel: typeof Answer,
  ) {}

  fetchAnswerAndAuthor(answerId: number) {
    return this.answerModel.findByPk(answerId, {
      attributes: ['id', 'body', 'question_id'],
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
  }

  async create(personId: number, data: CreateAnswerDto) {
    const created = await this.answerModel.create({
      ...data,
      person_id: personId,
      question_id: data.question_id,
    });
    const qandAuthor = await this.fetchAnswerAndAuthor(created.id);

    return qandAuthor;
  }

  async update(id: number, data: Partial<CreateAnswerDto>, personId: number) {
    await this.answerModel.update(
      { ...data },
      { where: { id: id, person_id: personId }, returning: true },
    );

    const qandAuthor = await this.fetchAnswerAndAuthor(id);
    return qandAuthor;
  }

  async deleteAnswer(id: number, personId: number) {
    await this.answerModel.destroy({
      where: {
        id: id,
        person_id: personId,
      },
    });
  }

  async fetchAnswers(personId: number, questionId: number) {
    const answers = await this.answerModel.findAll({
      where: {
        person_id: personId,
        question_id: questionId,
      },
      attributes: ['id', 'body', 'question_id'],
      include: [
        {
          model: Person,
          attributes: ['id', 'first_name', 'last_name'],
        },
      ],
    });

    return answers;
  }

  async upvoteAnswer(id: number) {
    const answer = await this.answerModel.findOne({
      where: {
        id: id,
      },
    });

    if (!answer) {
      throw new NotFoundException('Answer does not exist');
    }

    answer.upvote += 1;
    answer.save();
  }

  async downvoteAnswer(id: number) {
    const answer = await this.answerModel.findOne({
      where: {
        id: id,
      },
    });

    if (!answer) {
      throw new NotFoundException('Answer does not exist');
    }

    answer.downvote -= 1;
    answer.save();
  }
}
