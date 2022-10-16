/* eslint-disable @typescript-eslint/no-unused-vars */
import { Middleware } from 'redux';
import { Socket } from 'socket.io-client';

import type { RootState as R } from '../store';
import { SOCKET_CONNECT } from '../constants/actionNames/socketEvents';

import * as PARTY_EVENTS from '../constants/actionNames/partyEvents';
import * as ITEM_EVENTS from '../constants/actionNames/itemEvents';
import * as USER_EVENTS from '../constants/actionNames/userEvents';
import handleSocketConnect from './handlers/socketHandlers';

const actionTypesToIntercept = [
  Object.values(PARTY_EVENTS),
  Object.values(ITEM_EVENTS),
  Object.values(USER_EVENTS),
].flat();

let socket: Socket | null = null;

const websocketMiddleware: Middleware<{}, R> = ({ dispatch, getState }) => (next) => (action) => {
  if (action.type === SOCKET_CONNECT) {
    if (socket) {
      socket.disconnect();
    }

    socket = handleSocketConnect(dispatch);
  }
  if (actionTypesToIntercept.includes(action.type) && socket) {
    socket.emit(action.type, action.payload);
  }

  return next(action);
};

export default websocketMiddleware;
