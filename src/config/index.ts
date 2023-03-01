import { ConfigModuleOptions } from '@nestjs/config';

export interface IConfig {
  port: number;
  nodeEnv: string;
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
  };
}

export enum Config {
  Port = 'port',
  NodeEnv = 'nodeEnv',
  Database = 'database',
}

const config = (): IConfig => ({
  port: +process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  database: {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
});

export const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
  load: [config],
};
