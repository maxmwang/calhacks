import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import type { TError } from '../../types/misc';

const initialState: TError = {
  type: '',
  message: '',
};

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    set(state, action: PayloadAction<TError>) {
      return action.payload;
    },
    reset: () => initialState,
  },
});

export const selectError = (state: RootState): TError => state.error;

export default errorSlice.reducer;
