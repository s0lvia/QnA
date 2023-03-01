import { ConfigService } from '@nestjs/config';
import {
  SequelizeModuleAsyncOptions,
  SequelizeModuleOptions,
} from '@nestjs/sequelize';
import { Config, IConfig } from '.';

const getOpts = (c: ConfigService<IConfig>): SequelizeModuleOptions => {
  const db = c.get(Config.Database, { infer: true });
  return {
    dialect: 'mysql',
    host: db.host,
    port: db.port,
    username: db.username,
    password: db.password,
    database: db.name,
    synchronize: true,
  };
};

export const sequelizeConfigOpts: SequelizeModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: (c: ConfigService<IConfig>) => getOpts(c),
};
