import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Answer } from './answer.model';
import { CreateAnswerDto } from './answer.dto';
import { Person } from 'src/auth/person.model';
import { Comment } from 'src/comment/comment.model';
import { AnswerMeta } from './answer-meta.model';

@Injectable()
export class AnswerService {
  constructor(
    @InjectModel(Answer) private readonly answerModel: typeof Answer,
    @InjectModel(AnswerMeta)
    private readonly answerMetaModel: typeof AnswerMeta,
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

  async upvoteAnswer(id: number, personId: number) {
    const answer = await this.answerModel.findOne({
      where: {
        id: id,
      },
    });

    if (!answer) {
      throw new NotFoundException('Answer does not exist');
    }

    const answerMeta = await this.answerMetaModel.findOne({
      where: {
        answer_id: id,
        person_id: personId,
        status: 'upvote',
      },
    });

    if (answerMeta) {
      throw new NotFoundException('can vote only once');
    }
    await this.answerMetaModel.create({
      person_id: personId,
      answer_id: id,
      status: 'upvote',
    });

    answer.upvote += 1;
    answer.save();
  }

  async downvoteAnswer(id: number, personId: number) {
    const answer = await this.answerModel.findOne({
      where: {
        id: id,
      },
    });

    if (!answer) {
      throw new NotFoundException('Answer does not exist');
    }

    const answerMeta = await this.answerMetaModel.findOne({
      where: {
        answer_id: id,
        person_id: personId,
        status: 'downvote',
      },
    });

    if (answerMeta) {
      throw new NotFoundException('can vote only once');
    }
    await this.answerMetaModel.create({
      person_id: personId,
      answer_id: id,
      status: 'downvote',
    });

    answer.downvote += 1;
    answer.save();
  }
}
