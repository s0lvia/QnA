import Joi from 'joi';
export class CreateAnswerDto {
  body: string;
}

export const createAnswerSchema = Joi.object<CreateAnswerDto>({
  body: Joi.string().required().min(10),
});

export const updateAnswerSchema = Joi.object<CreateAnswerDto>({
  body: Joi.string().min(10),
});
