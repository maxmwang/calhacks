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
  userId: TParty['membersId'][number]; // User Schema
};
export type TLeaveParty = {
  code: TParty['code'];
  userId: TParty['membersId'][number] | string; // User Schema
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
  ownerId: TItem['ownerIds'][number];
};
export type TUnclaimItem = {
  code: TParty['code'];
  itemId: ObjectId;
  ownerId: TItem['ownerIds'][number];
};
