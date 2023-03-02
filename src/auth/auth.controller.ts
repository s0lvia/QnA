import { SuccessResponseObject } from '@akhilome/common';
import { Body, Controller, Post } from '@nestjs/common';
import { JoiSchema } from 'src/common/joi.pipe';
import { RegisterDto, registerSchema } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async handleRegister(@Body(JoiSchema(registerSchema)) body: RegisterDto) {
    const data = await this.authService.register(body);

    return new SuccessResponseObject('registration successful', data);
  }
}
