import { combineReducers, configureStore } from '@reduxjs/toolkit';

import websocketMiddleware from './middleware/websocket';
import selfReducer from './features/selfSlice';
import partyReducer from './features/partySlice';
import viewReducer from './features/viewSlice';
import errorReducer from './features/errorSlice';
import axiosMiddleware from './middleware/axios';

const rootReducer = combineReducers({
  self: selfReducer,
  party: partyReducer,
  view: viewReducer,
  error: errorReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(websocketMiddleware)
    .concat(axiosMiddleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
