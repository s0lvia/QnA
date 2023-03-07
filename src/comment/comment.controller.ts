import { SuccessResponseObject } from '@akhilome/common';
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  CreateCommentDto,
  createCommentSchema,
  updateCommentSchema,
} from 'src/comment/comment.dto';
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

  @UseGuards(AuthGuard)
  @Put('/:id')
  async handleUpdateComment(
    @Req() req,
    @Param('id') id: string,
    @Body(JoiSchema(updateCommentSchema)) body: CreateCommentDto,
  ) {
    const comment = await this.commentService.fetchCommentandAuthor(+id);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    const data = await this.commentService.update(+id, body, req.user.id);

    return new SuccessResponseObject('Comment update', data);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteComment(@Param('id') id: string, @Req() req) {
    const answer = await this.commentService.fetchCommentandAuthor(+id);

    if (!answer) {
      throw new NotFoundException('Answer does not exist');
    }

    await this.commentService.deleteComment(+id, req.user.id);
  }
}
