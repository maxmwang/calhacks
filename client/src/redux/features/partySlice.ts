import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import type TParty from '../../api/party';
import type TItem from '../../api/item';

const initialState: TParty = {
  name: '',
  code: '',
  host: '',
  members: [],
  items: [],
  tip: 0,
  tax: 0,
};

export const partySlice = createSlice({
  name: 'party',
  initialState,
  reducers: {
    set(state, action: PayloadAction<TParty>) {
      return action.payload;
    },
  },
});

export const selectParty = (state: RootState): TParty => state.party;
export const selectPartyCode = (state: RootState): TParty['code'] => state.party.code;
export const selectItems = (state: RootState): TItem[] => state.party.items;

export default partySlice.reducer;
