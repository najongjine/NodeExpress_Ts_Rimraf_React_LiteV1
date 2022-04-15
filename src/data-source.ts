import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity_sample/User';

import { configSettings } from './config/settings';

export const AppDataSource = new DataSource({
  type: 'mariadb',
  host: configSettings.typeOrmDb1.host,
  port: configSettings.typeOrmDb1.port,
  username: configSettings.typeOrmDb1.username,
  password: configSettings.typeOrmDb1.password,
  database: configSettings.typeOrmDb1.database,
  entities: [`dist/entity/**/*.js`],
  synchronize: configSettings.typeOrmDb1.synchronize,
  logging: configSettings.typeOrmDb1.logging,
  migrations: ['migration/*.js'], //migration 하고싶은 파일 명
});
