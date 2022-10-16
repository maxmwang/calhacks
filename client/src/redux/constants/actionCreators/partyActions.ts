import type TParty from '../../../api/party';
import {
  PARTY_CREATE,
  PARTY_DELETE,
  PARTY_JOIN,
  PARTY_LEAVE,
  PARTY_SET,
} from '../actionNames/partyEvents';

export const partyCreate = (name: string, host: string) => ({
  type: PARTY_CREATE,
  payload: {
    name,
    host,
  },
});

export const partyDelete = (code: string, host: string) => ({
  type: PARTY_DELETE,
  payload: {
    code,
    host,
  },
});

export const partyJoin = (code: string, member: string) => ({
  type: PARTY_JOIN,
  payload: {
    code,
    member,
  },
});

export const partyLeave = (code: string, member: string) => ({
  type: PARTY_LEAVE,
  payload: {
    code,
    member,
  },
});

export const partySet = (party: TParty) => ({
  type: PARTY_SET,
  payload: party,
});
