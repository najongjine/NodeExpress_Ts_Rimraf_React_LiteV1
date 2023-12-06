/**
 * dev : 로컬 컴퓨터 개발
 * else : azure app service
 */
const ENV_MODE = process.env.NODE_ENV;
let PORT = 3000;
var typeOrmDb1 = {
  type: '',
  host: '',
  port: 3306,
  username: '',
  password: '',
  database: '',
  synchronize: false,
  logging: false,
};
const cryptoKey = 'cryptoKeySample@#@$%#%$#@!!';
const jwtKey = 'jwtKeySample@#@$%#%$#@!!';
let mongoDBConnString = '';

if (ENV_MODE === 'development') {
  typeOrmDb1.type = 'mysql';
  typeOrmDb1.host = 'localhost';
  typeOrmDb1.port = 3306;
  typeOrmDb1.username = 'root';
  typeOrmDb1.password = 'a12345';
  typeOrmDb1.database = 'test1';
  typeOrmDb1.synchronize = false;
  typeOrmDb1.logging = true;
} else {
  typeOrmDb1.type = '안알랴줌';
  typeOrmDb1.host = '안알랴줌';
  typeOrmDb1.port = 3306;
  typeOrmDb1.username = '안알랴줌';
  typeOrmDb1.password = '안알랴줌';
  typeOrmDb1.database = 'test';
  typeOrmDb1.synchronize = false;
  typeOrmDb1.logging = false;

  mongoDBConnString = `안알랴줌`;
}

export const configSettings = {
  typeOrmDb1,
  ENV_MODE,
  cryptoKey,
  jwtKey,
  mongoDBConnString,
  PORT,
};
