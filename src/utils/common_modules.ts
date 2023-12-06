import * as socketIO from 'socket.io';
export let httpServer_ref: any;
export let app_ref: any;
export let socketIO_ref: socketIO.Server;
export let socket_ref: socketIO.Socket;

export function set_httpServer_ref(object: any) {
  httpServer_ref = object;
}
export function set_app_ref(object: any) {
  app_ref = object;
}
export function set_socketIO(object: socketIO.Server) {
  socketIO_ref = object;
}
export function set_socket(object: socketIO.Socket) {
  socket_ref = object;
}
