import Joi from 'joi';

export class RegisterDto {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export const registerSchema = Joi.object<RegisterDto>({
  email: Joi.string().email().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  password: Joi.string().min(8).required(),
});
