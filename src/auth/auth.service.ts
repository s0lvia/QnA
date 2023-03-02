import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LoginDto, RegisterDto } from './auth.dto';
import { Person } from './person.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { Config, IConfig } from 'src/config';

interface JwtPayload {
  sub: number;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Person) private readonly person: typeof Person,
    private readonly config: ConfigService<IConfig>,
  ) {}

  private logger = new Logger(AuthService.name);

  private hash(password: string): string {
    return bcrypt.hashSync(password);
  }

  private compare(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }

  private generateJwt(data: JwtPayload) {
    const jwtConfig = this.config.get(Config.Jwt, { infer: true });
    const token = jwt.sign(data, jwtConfig.secret, {
      expiresIn: '1d',
    });

    return token;
  }

  async register(data: RegisterDto) {
    const existingPerson = await this.person.findOne({
      where: { email: data.email },
    });

    if (existingPerson) {
      throw new ConflictException('email already exists');
    }

    const person = await this.person.create({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      hash: this.hash(data.password),
    });

    const token = this.generateJwt({ sub: person.id });

    return { token };
  }

  async login(data: LoginDto) {
    // check db for email
    const user = await this.person.findOne({
      where: { email: data.email },
    });

    if (!user) {
      this.logger.debug(`email not found for ${data.email}`);
      throw new UnauthorizedException('Unable to log in');
    }
    // compare hashed password
    const passwordMatch = this.compare(data.password, user.hash);

    if (!passwordMatch) {
      throw new UnauthorizedException('Password mismatch');
    }
    // generate jwt
    const token = this.generateJwt({ sub: user.id });
    // return token
    return { token };
  }
}
