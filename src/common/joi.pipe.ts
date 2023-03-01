import { ErrorResponseObject } from '@akhilome/common';
import {
  ArgumentMetadata,
  Injectable,
  InternalServerErrorException,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import Joi from 'joi';
import { RequestValidationException } from './error';

const opts: Joi.ValidationOptions = {
  abortEarly: false,
  stripUnknown: true,
};

@Injectable()
class JoiPipe implements PipeTransform {
  private logger = new Logger(JoiPipe.name);

  constructor(private schema: Joi.ObjectSchema) {}

  async transform(value: Record<string, unknown>, meta: ArgumentMetadata) {
    try {
      const validated = await this.schema.validateAsync(value, opts);

      return validated;
    } catch (e) {
      this.logger.debug(e);

      if (e instanceof Joi.ValidationError) {
        const errors = e.details.map((e) => ({
          message: e.message,
          field: e?.context?.label,
        }));

        throw new RequestValidationException(
          new ErrorResponseObject(
            `request ${meta.type} failed validation`,
            errors,
          ),
        );
      } else {
        this.logger.error(e);
        throw new InternalServerErrorException('An unknown error occured');
      }
    }
  }
}

export const JoiSchema = <T>(schema: Joi.ObjectSchema<T>) =>
  new JoiPipe(schema);
