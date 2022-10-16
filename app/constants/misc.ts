import { ClientToServerEvents } from './socketTypes';
import { TParty } from '../models/partyModel';

export type TError = {
  type: 'code' | 'partyName' | 'userId' | 'item' | 'itemId' | 'populate';
  message: string;
};

export type TSuccess = {
  type: keyof ClientToServerEvents;
  payload?: TParty; // < what
  // => [client -> wsmiddleware] socket handle succes
  // => [client -> app.jsx]  view handle new redux view
  // => [client -> wsmiddleware] socket handle errors
  // => [client -> create.jsx] error handler
};

export type TSocketUser = {
  userId: TParty['membersId'][number] | string;
  partyCode: TParty['code'];
};
