import * as dotenv from 'dotenv';
import express from 'express';
import session, { Session } from 'express-session';
import http from 'http';
import { Server } from 'socket.io';
import passport from 'passport';
import MongoStore from 'connect-mongo';

import initDB from './config/db';
import initPassport from './config/passport';

import type {
  AppServer,
  ClientToServerEvents as C,
  ServerToClientEvents as S,
  I,
  MySocket as S_D,
  MySocket,
  AppSocket,
  // AppSocket,
} from './constants/socketTypes';

import auth from './middleware/auth';

import userRoutes from './routes/userRoutes';

// import partyHandler from './handlers/partyHandler';
// import itemHandler from './handlers/itemHandler';

// add typing
declare module 'http' {
  interface IncomingMessage {
    session: Session & {
      authenticated: boolean
    }
  }
}
declare module 'express-session' {
  export interface SessionData {
    passport: { user: { _id: string } };
  }
}
declare module 'passport' {
  interface IVerifyOptions {
    type: string;
    message: string;
  }
}

dotenv.config();

const PORT = Number(process.env.PORT) || 5000;

const clientPromise = initDB();
initPassport();

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    // secure: true, // <-- set to true in production
    maxAge: 1000 * 60 * 60,
  },
  store: MongoStore.create({ clientPromise }),
});

const app = express();

// http server
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', userRoutes);
app.get('/test', (req, res) => {
  console.log(req.isAuthenticated());
  console.log(req.session);
  res.end();
});

const server = http.createServer(app);
const io: AppServer = new Server<C, S, I, S_D>(server);

const wrap = (m: any) => (s: AppSocket, next: any) => {
  const socket = s as MySocket;
  socket.request.test = 1;
  console.log(typeof m);
  return m(socket.request, {}, next);
};

io.use(wrap(sessionMiddleware));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));

io.use((s, n) => auth(<MySocket> s, n));

io.on('connection', (s: AppSocket) => {
  const socket = <MySocket> s;
  console.log(socket.request.logIn());
  console.log(socket.request.passport);
});

// websocket server
// io.on('connection', async (socket: AppSocket) => {
//   // event: "item:*"
//   itemHandler(io, socket);

//   // event: "party:*"
//   partyHandler(io, socket);
// });

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
