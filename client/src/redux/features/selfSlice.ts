import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import type TSelf from '../../types/self';

const initialState: TSelf = {
  name: '',
};

export const selfSlice = createSlice({
  name: 'self',
  initialState,
  reducers: {
    set(state, action: PayloadAction<TSelf>) {
      return action.payload;
    },
  },
});

export const selectName = (state: RootState): TSelf['name'] => state.self.name;

export default selfSlice.reducer;
