import Joi from 'joi';
export class CreateQuestionDto {
  title: string;
  body: string;
}

export const createQuestionSchema = Joi.object<CreateQuestionDto>({
  title: Joi.string().required().min(5),
  body: Joi.string().required().min(10),
});

export const updateQuestionSchema = Joi.object<CreateQuestionDto>({
  title: Joi.string().min(5),
  body: Joi.string().min(10),
});
