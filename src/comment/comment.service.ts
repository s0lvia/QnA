import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Question } from 'src/question/question.model';
import { Person } from 'src/auth/person.model';
import { Answer } from 'src/answer/answer.model';
import { Comment } from './comment.model';
import { CreateCommentDto } from './comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment) private readonly commentModel: typeof Comment,
  ) {}

  fetchAnswerQuestionandAuthor(commentId: number) {
    return this.commentModel.findByPk(commentId, {
      attributes: ['id', 'entity', 'entity_id', 'body'],
      include: [
        {
          model: Person,
          attributes: ['id', 'first_name', 'last_name'],
        },
        {
          model: Question,
          attributes: ['id', 'body'],
        },
        {
          model: Answer,
          attributes: ['id', 'body'],
        },
      ],
    });
  }

  async create(personId: number, data: CreateCommentDto) {
    const created = await this.commentModel.create({
      ...data,
      person_id: personId,
    });

    const qandAuthor = await this.fetchAnswerQuestionandAuthor(created.id);

    return qandAuthor;
  }
}
