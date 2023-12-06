import 'reflect-metadata';
import { DataSource } from 'typeorm';

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

// DB to Entity : (--ssl 은 상황에 따라 붙이거나 삭제시킴)
// typeorm-model-generator -h DB주소 -d 스키마이름 -p 포트번호 -u db계정이름 -x 비번 -e db종류 -o ./src --ssl
// typeorm-model-generator -h localhost -d test1 -p 3306 -u root -x a12345 -e mariadb -o ./src --ssl
