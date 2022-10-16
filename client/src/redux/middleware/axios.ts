import { Middleware } from 'redux';
import axios from 'axios';

import type { RootState as R } from '../store';
import type Handler from './handlers/handler';

import * as USER_EVENTS from '../constants/actionNames/userEvents';
import * as USER_HANDLERS from './handlers/userHandlers';

axios.defaults.withCredentials = true;
axios.defaults.validateStatus = () => true;

const handlers: { [key: string]: Handler } = {
  [USER_EVENTS.USER_LOGIN]: USER_HANDLERS.handleUserLogin,
  [USER_EVENTS.USER_REGISTER]: USER_HANDLERS.handleUserRegister,
  [USER_EVENTS.USER_LOGOUT]: USER_HANDLERS.handleUserLogout,
};

const axiosMiddleware: Middleware<{}, R> = ({ dispatch, getState }) => (next) => async (action) => {
  if (action.type in handlers) {
    await handlers[action.type]({ dispatch, getState }, action);
  }
  return next(action);
};

export default axiosMiddleware;
