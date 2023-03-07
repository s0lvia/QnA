import Joi from 'joi';
export class CreateCommentDto {
  body: string;
  entity: string;
  entity_id: number;
}

export const createCommentSchema = Joi.object<CreateCommentDto>({
  body: Joi.string().required().min(10),
  entity: Joi.string().required(),
  entity_id: Joi.number().required(),
});

export const updateCommentSchema = Joi.object<CreateCommentDto>({
  body: Joi.string().min(10),
});
