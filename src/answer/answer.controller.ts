import { SuccessResponseObject } from '@akhilome/common';
import {
  Controller,
  Body,
  Req,
  Param,
  UseGuards,
  Post,
  Put,
  Get,
  NotFoundException,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { JoiSchema } from 'src/common/joi.pipe';
import { AnswerService } from './answer.service';
import {
  CreateAnswerDto,
  createAnswerSchema,
  updateAnswerSchema,
} from './answer.dto';
import { QuestionService } from '../question/question.service';

@Controller('answers')
export class AnswerController {
  constructor(
    private readonly answerService: AnswerService,
    private readonly questionService: QuestionService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('/')
  async handleCreateQuestion(
    @Req() req,
    @Body(JoiSchema(createAnswerSchema)) body: CreateAnswerDto,
  ) {
    const question = await this.questionService.fetchQuestionAndAuthor(
      body.question_id,
    );

    if (!question) {
      throw new NotFoundException('Question does not exist');
    }
    const personId: number = req.user.id;
    const data = await this.answerService.create(personId, body);

    return new SuccessResponseObject('Answer created', data);
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  async editAnswer(
    @Param('id') id: string,
    @Req() req,
    @Body(JoiSchema(updateAnswerSchema)) body: CreateAnswerDto,
  ) {
    const answer = await this.answerService.fetchAnswerAndAuthor(+id);

    if (!answer) {
      throw new NotFoundException('Answer does not exist');
    }
    const data = await this.answerService.update(+id, body, req.user.id);
    return new SuccessResponseObject('Answer updated', data);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAnswer(@Param('id') id: string, @Req() req) {
    const answer = await this.answerService.fetchAnswerAndAuthor(+id);

    if (!answer) {
      throw new NotFoundException('Answer does not exist');
    }

    await this.answerService.deleteAnswer(+id, req.user.id);
  }

  @Get('/')
  async fetchAllAnswers(@Query() query) {
    const personId: number = query.user_id;
    const questionId: number = query.question_id;

    const question = await this.questionService.fetchQuestionAndAuthor(
      questionId,
    );

    if (!question) {
      throw new NotFoundException('Question does not exist');
    }

    const data = await this.answerService.fetchAnswers(personId, questionId);

    return new SuccessResponseObject('Answers retrieved', data);
  }

  @Get('/:id')
  async fetchAnAnswer(@Param('id') id: string) {
    const answer = await this.answerService.fetchAnswerAndAuthor(+id);

    if (!answer) {
      throw new NotFoundException('Answer does not exist');
    }

    return new SuccessResponseObject('Question retrieved', answer);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/:id/upvote')
  async handleUpVote(@Param('id') id: string, @Req() req) {
    const answer = await this.answerService.fetchAnswerAndAuthor(+id);

    if (!answer) {
      throw new NotFoundException('Answer does not exist');
    }
    await this.answerService.upvoteAnswer(+id);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/:id/upvote')
  async handleDownVote(@Param('id') id: string, @Req() req) {
    const answer = await this.answerService.fetchAnswerAndAuthor(+id);

    if (!answer) {
      throw new NotFoundException('Answer does not exist');
    }
    await this.answerService.upvoteAnswer(+id);
  }
}
