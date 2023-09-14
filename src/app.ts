//@ts-ignore
import express, { Express, Request, Response, NextFunction } from 'express';
//@ts-ignore
import path from 'path';
import initializeSocket from './socket';
import typeormRouter from './Router/typeorm/typeorm.route';
import validatorRouter from './Router/dataValidation/dataValidation.route';
import jwtRouter from './Router/jwt/jwt.route';
import streamRouter from './Router/stream/stream.route';
import imageUploadRouter from './Router/image_upload/imageUpload.route';
import test1Router from './Router/test/test1.route';
import ejsRouter from './Router/ejs/ejs.route';
const socketRouter = require('./Router/socket/websocket.route');
import { AppDataSource } from './data-source';
import { configSettings } from './config/settings';
const flash = require('connect-flash');
const cors = require('cors');
const bcrypt = require('bcrypt');

require('dotenv').config();

// app 이라는건 하나의 서버. 싱글톤 인스턴스이기도 함
const app: Express = express();
app.use(cors());

const fs = require('fs');
const https = require('https');

/** webrtc 용 테스트를 위한 이상한 파일들 */
const credentials = {
  key: fs.readFileSync('./private.pem'),
  cert: fs.readFileSync('./public.pem'),
};

const http = require('http').createServer(app);
//const http = https.createServer(credentials, app);

initializeSocket(http, app);

const port: Number = 3003;

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

/** Multer 세팅 */
let imgUpload = require('./multer/imageUpload.js');
/** END */

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
app.use('/socket', socketRouter('pass_some_object'));
app.use('/validator', validatorRouter);
app.use('/jwt', jwtRouter);
app.use('/stream', streamRouter);
app.use('/image_upload', imageUploadRouter);
app.use('/test', test1Router);
app.use('/ejs', ejsRouter);

require('./schedule');
