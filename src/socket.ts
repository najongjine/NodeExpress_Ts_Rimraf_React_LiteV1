import { Server } from 'socket.io';
import * as common_modules from './utils/common_modules';

export default () => {
  const io = new Server(common_modules.httpServer_ref);
  common_modules.set_socketIO(io);
  io.on('connection', async (socket) => {
    common_modules.set_socket(socket);
    console.log('User Connected :' + socket.id);
    //Triggered when a peer hits the join room button.
    io.to(socket.id).emit('socket_id', socket.id);

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

    socket.on('custom-event', function (msg: any) {
      console.log('## custom-event msg: ', msg);
      socket.broadcast.emit('custom-event', 'dfdfd 33'); //Sends Answer to the other peer in the room except sender.
    });

    //Triggered when peer leaves the room.

    socket.on('leave', function (roomName: string) {
      socket.leave(roomName);
      socket.broadcast.to(roomName).emit('leave');
    });
  });
};
