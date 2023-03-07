import { SuccessResponseObject } from '@akhilome/common';
import {
  Body,
  Controller,
  NotFoundException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateCommentDto, createCommentSchema } from 'src/comment/comment.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { JoiSchema } from 'src/common/joi.pipe';
import { CommentService } from './comment.service';
import { QuestionService } from 'src/question/question.service';
import { AnswerService } from 'src/answer/answer.service';

@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly questionService: QuestionService,
    private readonly answerService: AnswerService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('/')
  async handleCreateComment(
    @Req() req,
    @Body(JoiSchema(createCommentSchema)) body: CreateCommentDto,
  ) {
    const personId: number = req.user.id;
    const data = await this.commentService.create(personId, body);

    return new SuccessResponseObject('Comment created', data);
  }
}
