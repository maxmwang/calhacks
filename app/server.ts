import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import * as dotenv from 'dotenv';

import connectDB from './config/db';

import type {
  AppServer,
  ClientToServerEvents as C,
  ServerToClientEvents as S,
  I,
  SocketData as S_D,
  AppSocket,
} from './constants/socketTypes';
import partyHandler from './handlers/partyHandler';
import itemHandler from './handlers/itemHandler';

dotenv.config();

const PORT = Number(process.env.PORT) || 5000;

connectDB();

const app = express();
const server = http.createServer(app);
const io: AppServer = new Server<C, S, I, S_D>(server);

io.on('connection', async (socket: AppSocket) => {
  // event: "item:*"
  itemHandler(io, socket);

  // event: "party:*"
  partyHandler(io, socket);
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
