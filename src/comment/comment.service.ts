import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Person } from 'src/auth/person.model';
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
      ],
    });
  }

  async create(personId: number, data: CreateCommentDto) {
    const created = await this.commentModel.create({
      ...data,
      person_id: personId,
    });
    if (data.entity == 'answer') {
      created.answer_id = data.entity_id;
    } else if (data.entity == 'question') {
      created.question_id = data.entity_id;
    }

    created.save();
    const candAuthor = await this.fetchAnswerQuestionandAuthor(created.id);

    return candAuthor;
  }
}
