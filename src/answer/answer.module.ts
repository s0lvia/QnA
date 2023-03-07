import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { Answer } from './answer.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { QuestionModule } from 'src/question/question.module';
import { AuthModule } from 'src/auth/auth.module';
import { Question } from 'src/question/question.model';
import { QuestionService } from 'src/question/question.service';
import { AnswerMeta } from './answer-meta.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Answer, Question, AnswerMeta]),
    QuestionModule,
    AuthModule,
  ],
  providers: [AnswerService, QuestionService],
  controllers: [AnswerController],
})
export class AnswerModule {}
