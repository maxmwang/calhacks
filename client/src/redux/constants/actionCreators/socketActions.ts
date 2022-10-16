import { TError, TAppView } from '../../../types/misc';
import { SOCKET_CONNECT, ERROR_SET, VIEW_SET } from '../actionNames/socketEvents';

export const socketConnect = () => ({
  type: SOCKET_CONNECT,
});

export const errorSet = (error: TError) => ({
  type: ERROR_SET,
  payload: error,
});

export const appViewSet = (view: TAppView['view']) => ({
  type: VIEW_SET,
  payload: {
    view,
  },
});
