import Joi from 'joi';
export class CreateAnswerDto {
  question_id: number;
  body: string;
}

export const createAnswerSchema = Joi.object<CreateAnswerDto>({
  question_id: Joi.number().required(),
  body: Joi.string().required().min(10),
});

export const updateAnswerSchema = Joi.object<CreateAnswerDto>({
  body: Joi.string().min(10),
});
