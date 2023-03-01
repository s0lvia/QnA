import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configModuleOptions } from './config';
import { sequelizeConfigOpts } from './config/sequelize.config';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    SequelizeModule.forRootAsync(sequelizeConfigOpts),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
