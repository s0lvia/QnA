import { SuccessResponseObject } from '@akhilome/common';
import { Controller, Get, Query } from '@nestjs/common';
import Joi from 'joi';
import { AppService } from './app.service';
import { JoiSchema } from './common/joi.pipe';

const s = Joi.object({
  name: Joi.string().required(),
});
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Query(JoiSchema(s)) q) {
    console.log(q);
    const message = this.appService.getHello();

    return new SuccessResponseObject(message, null);
  }
}
