import { Server, Socket } from 'socket.io';

import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import type { TError, TSocketUser, TSuccess } from './misc';
import * as EVENTS from './socketEvents';
import * as PAYLOAD_TYPES from './payloadTypes';

export type AppServer = Server<ClientToServerEvents, ServerToClientEvents, I, SocketData>;
export type AppSocket = Socket<ClientToServerEvents, ServerToClientEvents, I, SocketData>;

export type ClientToServerEvents = DefaultEventsMap & {
  [EVENTS.PARTY_CREATE]: (payload: PAYLOAD_TYPES.TCreateParty) => void;
  [EVENTS.PARTY_DELETE]: (payload: PAYLOAD_TYPES.TDeleteParty) => void;
  [EVENTS.PARTY_JOIN]: (payload: PAYLOAD_TYPES.TJoinParty) => void;
  [EVENTS.PARTY_LEAVE]: (payload: PAYLOAD_TYPES.TLeaveParty) => void;
  [EVENTS.ITEM_ADD]: (payload: PAYLOAD_TYPES.TAddItem) => void;
  [EVENTS.ITEM_REMOVE]: (payload: PAYLOAD_TYPES.TRemoveItem) => void;
  [EVENTS.ITEM_CLAIM]: (payload: PAYLOAD_TYPES.TClaimItem) => void;
  [EVENTS.ITEM_UNCLAIM]: (payload: PAYLOAD_TYPES.TUnclaimItem) => void;
};

export type ServerToClientEvents = DefaultEventsMap & {
  [EVENTS.ERROR]: (error: TError) => void;
  [EVENTS.SUCCESS]: (success: TSuccess) => void;
};

export type I = {
  ping: () => void;
};

export type SocketData = Socket & {
  user: TSocketUser;
};
