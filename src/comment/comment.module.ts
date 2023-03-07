import { Module } from '@nestjs/common';
import { Comment } from './comment.model';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { AnswerService } from 'src/answer/answer.service';
import { QuestionService } from 'src/question/question.service';
import { AnswerModule } from 'src/answer/answer.module';
import { QuestionModule } from 'src/question/question.module';
import { Answer } from 'src/answer/answer.model';
import { Question } from 'src/question/question.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Comment, Answer, Question]),
    AnswerModule,
    QuestionModule,
    AuthModule,
  ],
  providers: [CommentService, AnswerService, QuestionService],
  controllers: [CommentController],
})
export class CommentModule {}
