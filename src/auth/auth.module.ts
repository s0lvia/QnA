import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Person } from './person.model';

@Module({
  imports: [SequelizeModule.forFeature([Person])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
