import {createSlice} from '@reduxjs/toolkit'

const setAssignRoomsForSessionsSlice = createSlice({
  name: 'assignRoomsForSessions',
  initialState: {
    sessions: {}
  },
  reducers: {
    setSessions: (state, action: any) => {
      state.sessions = action.payload
    }
  }
})

export const {setSessions} = setAssignRoomsForSessionsSlice.actions

export default setAssignRoomsForSessionsSlice.reducer
