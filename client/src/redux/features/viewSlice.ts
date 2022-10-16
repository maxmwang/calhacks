import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import type { TAppView } from '../../api/misc';

const initialState: TAppView = {
  view: 'join',
};

export const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    set(state, action: PayloadAction<TAppView>) {
      return action.payload;
    },
  },
});

export const selectAppView = (state: RootState): TAppView['view'] => state.view.view;

export default viewSlice.reducer;
