import { MySocket } from '../constants/socketTypes';

const auth = (socket: MySocket, next: any) => {
  // if (socket.request.request) {
  //   next();
  // } else {
  //   socket.emit('error', {
  //     type: 'auth',
  //     message: 'You must be logged in to perform this action',
  //   });
  // }
  next();
};

export default auth;
