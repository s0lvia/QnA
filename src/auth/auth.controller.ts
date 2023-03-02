import { SuccessResponseObject } from '@akhilome/common';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { JoiSchema } from 'src/common/joi.pipe';
import { LoginDto, loginSchema, RegisterDto, registerSchema } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async handleRegister(@Body(JoiSchema(registerSchema)) body: RegisterDto) {
    const data = await this.authService.register(body);

    return new SuccessResponseObject('registration successful', data);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async handleLogin(@Body(JoiSchema(loginSchema)) body: LoginDto) {
    const data = await this.authService.login(body);
    return new SuccessResponseObject('Login successful', data);
  }
}
