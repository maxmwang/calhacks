import { ObjectId } from 'mongoose';
import { AppServer, AppSocket } from '../constants/socketTypes';
import {
  PARTY_CREATE,
  PARTY_DELETE,
  PARTY_JOIN,
  PARTY_LEAVE,
} from '../constants/socketEvents';
import {
  TCreateParty,
  TDeleteParty,
  TJoinParty,
  TLeaveParty,
} from '../constants/payloadTypes';

import Party from '../models/partyModel';

// @desc Creates unique room code
function generateUniqueCode(): string {
  let code = '';
  do {
    code = Math.random().toString(36).substring(2, 8);
  } while (!Party.exists({ code }));
  return code;
}

// @desc store user metadata on server-side socket
function setSocketUser(socket: AppSocket, userId: ObjectId | string, partyCode: string): void {
  socket.data.user = {
    userId,
    partyCode,
  };
}

export default function partyHandler(io: AppServer, socket: AppSocket) {
  // @desc Creates a new party
  // @param name Name of the party
  // @param host Name of the host user
  // @returns Party object
  async function createParty({ name, host }: TCreateParty) {
    if (!host) {
      socket.emit('error', { type: 'partyName', message: 'A name is required' });
      return;
    }

    name = name || `${host}'s Party`;

    const party = new Party({
      name,
      code: generateUniqueCode(),
      host,
      members: [host],
    });

    await party.save();

    setSocketUser(socket, host, party.code);
    socket.join(party.code);
    socket.emit('success', { type: PARTY_CREATE, payload: party });
  }

  // @desc Deletes a party
  // @param code Code of the party
  async function deleteParty({ code, host }: TDeleteParty) {
    if (!code) {
      socket.emit('error', { type: 'code', message: 'A room code is required' });
      return;
    }

    const party = await Party.findOne({ code });
    if (!party) {
      socket.emit('error', { type: 'code', message: 'Party not found' });
      return;
    }
    if (party.host !== host) {
      socket.emit('error', { type: 'code', message: 'You are not the host' });
      return;
    }

    await Party.deleteOne({ code });

    setSocketUser(socket, host, '');
    socket.leave(code);
    socket.emit('success', { type: PARTY_DELETE });
  }

  // @desc Adds a user to a party
  // @param code Code of the party
  // @param user Name of the user
  // @returns Party object
  async function joinParty({ code, memberId: userId }: TJoinParty) {
    if (!code) {
      socket.emit('error', { type: 'code', message: 'A room code is required' });
      return;
    }
    if (!userId) {
      socket.emit('error', { type: 'userId', message: 'A UserID is required' });
      return;
    }

    const party = await Party.findOne({ code });
    if (!party) {
      socket.emit('error', { type: 'code', message: 'Party not found' });
      return;
    }

    party.membersId.push(userId);
    await party.save();
    setSocketUser(socket, userId, code);
    socket.join(code);

    party.populate('itemsId', (err, populatedParty: any) => {
      if (err) {
        socket.emit('error', { type: 'populate', message: err.message });
        return;
      }
      io.to(code).emit('success', { type: PARTY_JOIN, payload: populatedParty });
    });
  }

  // @desc Removes a user from a party
  // @param code Code of the party
  // @param user Name of the user
  async function leaveParty({ code, memberId: userId }: TLeaveParty) {
    if (!code) {
      socket.emit('error', { type: 'code', message: 'A room code is required' });
      return;
    }
    if (!userId) {
      socket.emit('error', { type: 'userId', message: 'A userId is required' });
      return;
    }

    const party = await Party.findOne({ code });
    if (!party) {
      socket.emit('error', { type: 'code', message: 'Party not found' });
      return;
    }

    party.membersId = party.membersId.filter((id) => id !== userId);
    await party.save();

    setSocketUser(socket, userId, '');
    socket.leave(code);
    socket.emit('success', { type: PARTY_LEAVE });
  }

  socket.data.user = {
    userId: '',
    partyCode: '',
  };

  socket.on('disconnect', () => {
    if (socket.data?.user?.partyCode && socket.data?.user?.userId) {
      const { partyCode, userId } = socket.data.user;
      leaveParty({ code: partyCode, memberId: userId });
    }
  });

  socket.on(PARTY_CREATE, createParty);

  socket.on(PARTY_DELETE, deleteParty);

  socket.on(PARTY_JOIN, joinParty);

  socket.on(PARTY_LEAVE, leaveParty);
}
