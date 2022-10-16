import { ObjectId } from 'mongoose';

import type { TItem } from '../models/itemModel';
import type { TParty } from '../models/partyModel';

export type TCreateParty = {
  name: TParty['name'];
  host: TParty['host'];
};
export type TDeleteParty = {
  code: TParty['code'];
  host: TParty['host'];
};
export type TJoinParty = {
  code: TParty['code'];
  member: TParty['members'][number]; // User Schema
};
export type TLeaveParty = {
  code: TParty['code'];
  member: TParty['members'][number]; // User Schema
};
export type TAddItem = {
  code: TParty['code'];
  item: TItem;
};
export type TRemoveItem = {
  code: TParty['code'];
  itemId: ObjectId;
};
export type TClaimItem = {
  code: TParty['code'];
  itemId: ObjectId;
  owner: TItem['owner'];
};
export type TUnclaimItem = {
  code: TParty['code'];
  itemId: ObjectId;
  owner: TItem['owner'];
};
