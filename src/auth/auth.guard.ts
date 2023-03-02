import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest();
    const bearer: string = req.headers.authorization;

    const jwt = bearer.replace(/Bearer\s/, '');
    const payload = this.authService.verifyToken(jwt);
    req.user = { id: payload.sub };

    return true;
  }
}
