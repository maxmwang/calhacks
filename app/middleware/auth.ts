import { MySocket } from '../constants/socketTypes';

const auth = (socket: MySocket, next: any) => {
  next();
  // console.log(socket.handshake.auth);

  // const { token } = socket.handshake.auth;

  // if (!token) {
  //   socket.emit('error', {
  //     type: 'auth',
  //     message: 'You must be logged in to perform this action',
  //   });
  // } else {
  //   next();
  // }
};

export default auth;
