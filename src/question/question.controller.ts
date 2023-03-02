import { SuccessResponseObject } from '@akhilome/common';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { JoiSchema } from 'src/common/joi.pipe';
import { CreateQuestionDto, createQuestionSchema } from './question.dto';
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
}
