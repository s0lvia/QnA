import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest();
    const bearer: string = req.headers.authorization;

    const jwt = bearer?.replace(/Bearer\s/, '');

    if (!jwt) {
      throw new UnauthorizedException('Authorization required');
    }

    const payload = this.authService.verifyToken(jwt);
    req.user = { id: payload.sub };

    return true;
  }
}
