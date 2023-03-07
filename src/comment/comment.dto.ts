import Joi from 'joi';
export class CreateCommentDto {
  entity_id: number;
  body: string;
  entity: string;
}

export const createCommentSchema = Joi.object<CreateCommentDto>({
  entity_id: Joi.number().required(),
  body: Joi.string().required().min(10),
  entity: Joi.string().required(),
});

export const updateAnswerSchema = Joi.object<CreateCommentDto>({
  body: Joi.string().min(10),
});
