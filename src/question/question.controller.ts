import { SuccessResponseObject } from '@akhilome/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { JoiSchema } from 'src/common/joi.pipe';
import {
  CreateQuestionDto,
  createQuestionSchema,
  updateQuestionSchema,
} from './question.dto';
import { QuestionService } from './question.service';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @UseGuards(AuthGuard)
  @Post('/')
  async handleCreateQuestion(
    @Req() req,
    @Body(JoiSchema(createQuestionSchema)) body: CreateQuestionDto,
  ) {
    const personId: number = req.user.id;
    const data = await this.questionService.create(personId, body);

    return new SuccessResponseObject('Question created', data);
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  async editQuestion(
    @Param('id') id: string,
    @Req() req,
    @Body(JoiSchema(updateQuestionSchema)) body: CreateQuestionDto,
  ) {
    const question = await this.questionService.fetchQuestionAndAuthor(+id);

    if (!question) {
      throw new NotFoundException('Question does not exist');
    }
    const data = await this.questionService.update(+id, body, req.user.id);
    return new SuccessResponseObject('Question updated', data);
  }

  @Get('/')
  async fetchAllQuestions() {
    const data = await this.questionService.fetchAll();

    return new SuccessResponseObject('Questions retrieved', data);
  }

  @Get('/:id')
  async fetchOneQuestion(@Param('id') id: string) {
    const data = await this.questionService.fetchQuestionAndAuthor(+id);

    if (!data) {
      throw new NotFoundException('Question does not exist');
    }

    return new SuccessResponseObject('Question retrieved', data);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteQuestion(@Param('id') id: string, @Req() req) {
    const question = await this.questionService.fetchQuestionAndAuthor(+id);

    if (!question) {
      throw new NotFoundException('Question does not exist');
    }

    await this.questionService.deleteQuestion(+id, req.user.id);
  }
}
