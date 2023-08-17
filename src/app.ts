import express, { Express, Request, Response,NextFunction  } from 'express';
import typeormRouter from './Router/typeorm/typeorm.route';
import validatorRouter from './Router/dataValidation/dataValidation.route';
import jwtRouter from './Router/jwt/jwt.route';
import streamRouter from './Router/stream/stream.route';
import imageUploadRouter from './Router/image_upload/imageUpload.route';
import test1Router from './Router/test/test1.route';
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
const { Server } = require('socket.io');

const io = new Server(http);

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
app.use(
  '/react1',
  express.static(`${configSettings.react_project1_path}/build`),
);

app.use(flash());

//* logging middleware
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(req.rawHeaders[1]);
    //console.log('this is logging middleware');
    next();
  },
);

// Use the error handler middleware after your routes
app.use((
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
app.get('/reacttest', function (req, res) {
  res.sendFile(`${configSettings.react_project1_path}/build/index.html`);
});
app.use('/typeorm', typeormRouter);
app.use('/socket', socketRouter('pass_some_object'));
app.use('/validator', validatorRouter);
app.use('/jwt', jwtRouter);
app.use('/stream', streamRouter);
app.use('/image_upload', imageUploadRouter);
app.use('/test', test1Router);

/** socket */
io.on('connection', function (socket: any) {
  console.log('User Connected :' + socket.id);

  //Triggered when a peer hits the join room button.

  socket.on('join', function (roomName: string) {
    let rooms = io.sockets.adapter.rooms;
    let room = rooms.get(roomName);

    //room == undefined when no such room exists.
    if (room == undefined) {
      socket.join(roomName);
      socket.emit('created');
    } else if (room.size == 1) {
      //room.size == 1 when one person is inside the room.
      socket.join(roomName);
      socket.emit('joined');
    } else {
      //when there are already two people inside the room.
      socket.emit('full');
    }
    console.log(rooms);
  });

  //Triggered when the person who joined the room is ready to communicate.
  socket.on('ready', function (roomName: string) {
    socket.broadcast.to(roomName).emit('ready'); //Informs the other peer in the room.
  });

  //Triggered when server gets an icecandidate from a peer in the room.

  socket.on('candidate', function (candidate: any, roomName: string) {
    console.log(candidate);
    socket.broadcast.to(roomName).emit('candidate', candidate); //Sends Candidate to the other peer in the room.
  });

  //Triggered when server gets an offer from a peer in the room.

  socket.on('offer', function (offer: any, roomName: string) {
    socket.broadcast.to(roomName).emit('offer', offer); //Sends Offer to the other peer in the room.
  });

  //Triggered when server gets an answer from a peer in the room.

  socket.on('answer', function (answer: any, roomName: string) {
    socket.broadcast.to(roomName).emit('answer', answer); //Sends Answer to the other peer in the room.
  });

  //Triggered when peer leaves the room.

  socket.on('leave', function (roomName: string) {
    socket.leave(roomName);
    socket.broadcast.to(roomName).emit('leave');
  });
});

require('./schedule');
