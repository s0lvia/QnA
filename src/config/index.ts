import { ConfigModuleOptions } from '@nestjs/config';

export interface IConfig {
  port: number;
  nodeEnv: string;
}

export enum Config {
  Port = 'port',
  NodeEnv = 'nodeEnv',
}

const config = (): IConfig => ({
  port: +process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
});

export const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
  load: [config],
};
