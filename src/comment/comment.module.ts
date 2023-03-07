import { Module } from '@nestjs/common';
import { Comment } from './comment.model';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { AnswerModule } from 'src/answer/answer.module';
import { QuestionModule } from 'src/question/question.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Comment]),
    AnswerModule,
    QuestionModule,
    AuthModule,
  ],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
