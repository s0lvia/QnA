import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SequelizeModule,
  SequelizeModuleAsyncOptions,
  SequelizeModuleOptions,
} from '@nestjs/sequelize';
import { Config, IConfig } from '.';

const getOpts = (c: ConfigService<IConfig>): SequelizeModuleOptions => {
  const logger = new Logger(SequelizeModule.name);
  const db = c.get(Config.Database, { infer: true });
  return {
    dialect: 'mysql',
    host: db.host,
    port: db.port,
    username: db.username,
    password: db.password,
    database: db.name,
    synchronize: false,
    autoLoadModels: true,
    logging: (sql) => logger.verbose(sql),
  };
};

export const sequelizeConfigOpts: SequelizeModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: (c: ConfigService<IConfig>) => getOpts(c),
};
