import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { Answer } from './answer.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { QuestionModule } from 'src/question/question.module';

@Module({
  imports: [SequelizeModule.forFeature([Answer]), QuestionModule],
  providers: [AnswerService],
  controllers: [AnswerController],
})
export class AnswerModule {}
