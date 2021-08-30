import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../store';

const setSessionsSlice = createSlice({
  name: 'sessions',
  initialState: { sessions: [] },
  reducers: {
    setSessions: (state, action: any) => {
      state.sessions = action.payload;
    },
  },
});

export const { setSessions } = setSessionsSlice.actions;

export default setSessionsSlice.reducer;

export const selectCount = (state: RootState) => state.sessions.sessions;
