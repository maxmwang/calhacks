import { Server, Socket } from 'socket.io';

import Party from '../models/partyModel';
import Item from '../models/itemModel';
import {
  ITEM_ADD,
  ITEM_CLAIM,
  ITEM_REMOVE,
  ITEM_UNCLAIM,
} from '../constants/socketEvents';
import {
  TAddItem,
  TClaimItem,
  TRemoveItem,
  TUnclaimItem,
} from '../constants/payloadTypes';

export default function itemHandler(io: Server, socket: Socket) {
  // @desc Adds item to party
  // @param code Code of the party
  // @param item Item to add
  async function addItem({ partyCode: code, item }: TAddItem) {
    if (!code) {
      socket.emit('error', { type: 'code', message: 'A room code is required' });
      return;
    }
    if (!item) {
      socket.emit('error', { type: 'item', message: 'An item is required' });
      return;
    }

    const party = await Party.findOne({ code });
    if (!party) {
      socket.emit('error', { type: 'code', message: 'Party not found' });
      return;
    }

    const itemDocument = await Item.create(item);

    party.itemsId.push(itemDocument._id);
    await party.save();
    party.populate('itemsId', (err, populatedParty: any) => {
      if (err) {
        socket.emit('error', { type: 'populate', message: err.message });
        return;
      }
      io.to(code).emit('success', { type: ITEM_ADD, payload: populatedParty });
    });
  }

  // @desc Removes item from party
  // @param code Code of the party
  // @param item Item to remove
  async function removeItem({ code, itemId }: TRemoveItem) {
    if (!code) {
      socket.emit('error', { type: 'code', message: 'A room code is required' });
      return;
    }
    if (!itemId) {
      socket.emit('error', { type: 'itemId', message: 'An item ID is required' });
      return;
    }

    const party = await Party.findOne({ code });
    if (!party) {
      socket.emit('error', { type: 'code', message: 'Party not found' });
      return;
    }

    party.itemsId = party.itemsId.filter((id) => id !== itemId);
    await party.save();
  }

  // @desc Assigns item to a user
  // @param code Code of the party
  // @param item Item to assign
  async function claimItem({ code, itemId, ownerId }: TClaimItem) {
    if (!code) {
      socket.emit('error', { type: 'code', message: 'A room code is required' });
      return;
    }
    if (!itemId) {
      socket.emit('error', { type: 'itemId', message: 'An item ID is required' });
      return;
    }
    if (!ownerId) {
      socket.emit('error', { type: 'name', message: 'A name is required' });
      return;
    }

    const party = await Party.findOne({ code });
    if (!party) {
      socket.emit('error', { type: 'code', message: 'Party not found' });
      return;
    }

    const item = await Item.findById(party.itemsId.find((id) => id === itemId));
    if (!item) {
      socket.emit('error', { type: 'item', message: 'Item not found' });
      return;
    }

    item!.ownerIds.push(ownerId);
    await party.save();
  }

  // @desc Unassigns item from a user
  // @param code Code of the party
  // @param item Item to unassign
  async function unclaimItem({ code, itemId, ownerId }: TUnclaimItem) {
    if (!code) {
      socket.emit('error', { type: 'code', message: 'A room code is required' });
      return;
    }
    if (!itemId) {
      socket.emit('error', { type: 'itemId', message: 'An item ID is required' });
      return;
    }
    if (!ownerId) {
      socket.emit('error', { type: 'name', message: 'A name is required' });
      return;
    }

    const party = await Party.findOne({ code });
    if (!party) {
      socket.emit('error', { type: 'code', message: 'Party not found' });
      return;
    }

    const itemExists = !!party.itemsId.find((id) => id === itemId);
    if (!itemExists) {
      socket.emit('error', { type: 'item', message: 'Item not found' });
      return;
    }

    const item = await Item.findById(itemId);
    if (!item!.ownerIds.includes(ownerId)) {
      socket.emit('error', { type: 'owner', message: 'You do not own this item' });
      return;
    }

    item!.ownerIds = item!.ownerIds.filter((id) => id !== ownerId);
    await party.save();
  }

  socket.on(ITEM_ADD, addItem);

  socket.on(ITEM_REMOVE, removeItem);

  socket.on(ITEM_CLAIM, claimItem);

  socket.on(ITEM_UNCLAIM, unclaimItem);
}
