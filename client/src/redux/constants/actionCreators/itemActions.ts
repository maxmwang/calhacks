import type TItem from '../../../types/item';
import {
  ITEM_ADD,
  ITEM_REMOVE,
  ITEM_CLAIM,
  ITEM_UNCLAIM,
} from '../actionNames/itemEvents';

export const itemAdd = (partyCode: string, item: TItem) => ({
  type: ITEM_ADD,
  payload: {
    partyCode,
    item,
  },
});

export const itemRemove = (partyCode: string, itemId: string) => ({
  type: ITEM_REMOVE,
  payload: {
    partyCode,
    itemId,
  },
});

export const itemClaim = (partyCode: string, itemId: string, ownerId: string) => ({
  type: ITEM_CLAIM,
  payload: {
    partyCode,
    itemId,
    ownerId,
  },
});

export const itemUnclaim = (partyCode: string, itemId: string, ownerId: string) => ({
  type: ITEM_UNCLAIM,
  payload: {
    partyCode,
    itemId,
    ownerId,
  },
});
