import {createSlice} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle

const setConsecutiveSessionsSlice = createSlice({
  name: 'consecutiveSessions',
  initialState: {
    consecutiveSessions: {},
    editConsecutiveSession: false,
    editingConsecutiveSessionId: '',
    editingConsecutiveSession: null
  },
  reducers: {
    setConsecutiveSessions: (state, action: any) => {
      state.consecutiveSessions = action.payload;
    },
    setEditConsecutiveSession: (state, action: any) => {
      state.editConsecutiveSession = action.payload;
    },
    setEditingConsecutiveSessionId: (state, action: any) => {
      state.editingConsecutiveSessionId = action.payload;
    },
    setEditingConsecutiveSession: (state, action: any) => {
      state.editingConsecutiveSession = action.payload;
    }
  }
});

export const {setConsecutiveSessions} = setConsecutiveSessionsSlice.actions;
export const {setEditConsecutiveSession} = setConsecutiveSessionsSlice.actions;
export const {setEditingConsecutiveSessionId} = setConsecutiveSessionsSlice.actions;
export const {setEditingConsecutiveSession} = setConsecutiveSessionsSlice.actions;

export default setConsecutiveSessionsSlice.reducer;


