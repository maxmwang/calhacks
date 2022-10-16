import { io, Socket } from 'socket.io-client';

import { AppDispatch } from '../../store';
import { partySet } from '../../constants/actionCreators/partyActions';
import { errorSet, appViewSet } from '../../constants/actionCreators/socketActions';
import {
  PARTY_CREATE,
  PARTY_DELETE,
  PARTY_JOIN,
  PARTY_LEAVE,
} from '../../constants/actionNames/partyEvents';

function handleSocketConnect(dispatch : AppDispatch): Socket {
  const socket = io();

  socket.on('error', (error) => {
    console.log(error);
    dispatch(errorSet(error));
  });

  socket.on('success', (success) => {
    console.log(success);
    if (success.payload) {
      dispatch(partySet(success.payload));
    }

    if (success.type === PARTY_CREATE || success.type === PARTY_JOIN) {
      dispatch(appViewSet('lobby'));
    } else if (success.type === PARTY_LEAVE || success.type === PARTY_DELETE) {
      dispatch(appViewSet('home'));
    }
  });

  return socket;
}

export default handleSocketConnect;
