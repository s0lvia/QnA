import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Answer } from './answer.model';
import { fetchQuestionAndAuthor } from '../question/question.service';
@Injectable()
export class AnswerService {
  constructor(
    @InjectModel(Answer) private readonly answerModel: typeof Answer,
  ) {}

  async create(personId: number, data: CreateAnswerDto)
}
