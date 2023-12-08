//@ts-ignore
import express, { Express, Request, Response, NextFunction } from 'express';

import { createClient } from 'redis';

//@ts-ignore
import path from 'path';
import Redis from 'ioredis';
import initializeSocket from './socket';
import typeormRouter from './Router/typeorm/typeorm.route';
import jwtRouter from './Router/jwt/jwt.route';
import streamRouter from './Router/stream/stream.route';
import imageUploadRouter from './Router/image_upload/imageUpload.route';
import test1Router from './Router/test/test1.route';
import ejsRouter from './Router/ejs/ejs.route';
import socketRouter from './Router/socket/socketio.route';
import excelRouter from './Router/excel/excel.route';
import { AppDataSource } from './data-source';
import { configSettings } from './config/settings';
import * as common_modules from './utils/common_modules';

const flash = require('connect-flash');
const cors = require('cors');

require('dotenv').config();

// app 이라는건 하나의 서버. 싱글톤 인스턴스이기도 함
const app = express() as any;
common_modules.set_app_ref(app);
app.use(cors());

const fs = require('fs');
const https = require('https');

/** webrtc 용 테스트를 위한 이상한 파일들 */
const credentials = {
  key: fs.readFileSync('./private.pem'),
  cert: fs.readFileSync('./public.pem'),
};
/** webrtc 용 테스트를 위한 이상한 파일들 END */
const http = require('http').createServer(app);
common_modules.set_httpServer_ref(http);
//const http = https.createServer(credentials, app);

/** redis connection */
// redis 같은 경우 객체 생성이후 reference 를 저장 시키면 다른 모듈에선 undefined 가 되버린다(redis 모듈의 특징인듯). redis 는 컴퓨터 자체에 설치된 메모리 db 소프트웨어라서
// 다른 모듈에서 redis를 사용하고 싶을땐 new Redis() 로 객체를 만들고 사용하면 이미 set() 된 값들은 앱 전역으로 공유된다
// (async () => {
//   const redis = new Redis();
//   redis.set('test1', 'test1');
// })();
/** redis connection END*/

// socket.io
initializeSocket();
// socket.io END

const port: Number = configSettings.PORT;

/** typeorm mysql connection */
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
/** END */

/** form tag에서 put, delete 요청도 할수있게 해줌 */
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
/** END */

/**
 * post로 온 데이터를 req.body 에서 꺼내기위한 body parser
 * body parser:= body or input으로 온 데이터를 해석을 할수있게 도와줌
 */
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ limit: '15mb', extended: true }));

app.use('/public', express.static('public'));

// Configure EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

app.use(flash());

//* logging middleware
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    //console.log(req.rawHeaders[1]);
    //console.log('this is logging middleware');
    next();
  },
);

// Use the error handler middleware after your routes
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

http.listen(port, function () {
  console.log('listening on ' + port);
});

app.get('/', function (req: any, res: any) {
  res.status(200).json({
    success: true,
    data: `__dirname : ${__dirname}`,
    custMsg: '',
    errMsg: '',
  });
});

app.use('/typeorm', typeormRouter);
app.use('/socket', socketRouter);
app.use('/jwt', jwtRouter);
app.use('/stream', streamRouter);
app.use('/image_upload', imageUploadRouter);
app.use('/test', test1Router);
app.use('/ejs', ejsRouter);
app.use('/excel', excelRouter);

require('./schedule');
