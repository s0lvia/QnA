import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { QuestionController } from './question.controller';
import { Question } from './question.model';
import { QuestionService } from './question.service';

@Module({
  imports: [SequelizeModule.forFeature([Question])],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
