import {createSlice} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle

const setParallelSessionsSlice = createSlice({
  name: 'parallelSessions',
  initialState: {
    parallelSessions: {},
    editParallelSession: false,
    editingParallelSessionId: '',
    editingParallelSession: null
  },
  reducers: {
    setParallelSessions: (state, action: any) => {
      state.parallelSessions = action.payload;
    },
    setEditParallelSession: (state, action: any) => {
      state.editParallelSession = action.payload;
    },
    setEditingParallelSessionId: (state, action: any) => {
      state.editingParallelSessionId = action.payload;
    },
    setEditingParallelSession: (state, action: any) => {
      state.editingParallelSession = action.payload;
    }
  }
});

export const {setParallelSessions} = setParallelSessionsSlice.actions;
export const {setEditParallelSession} = setParallelSessionsSlice.actions;
export const {setEditingParallelSessionId} = setParallelSessionsSlice.actions;
export const {setEditingParallelSession} = setParallelSessionsSlice.actions;

export default setParallelSessionsSlice.reducer;


