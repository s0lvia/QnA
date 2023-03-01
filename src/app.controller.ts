import { SuccessResponseObject } from '@akhilome/common';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    const message = this.appService.getHello();

    return new SuccessResponseObject(message, null);
  }
}
