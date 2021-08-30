import {createSlice} from '@reduxjs/toolkit'

const setRoomsSlice = createSlice({
  name: 'rooms',
  initialState: {
    rooms: {},
    buildings: {},
    existingRoom: false,
    editRoom: false,
    editingRoomId: '',
    editingRoom: null
  },
  reducers: {
    setRooms: (state, action: any) => {
      state.rooms = action.payload
    },
    setBuildings: (state, action: any) => {
      state.buildings = action.payload
    },
    setExistingRoom: (state, action: any) => {
      state.existingRoom = action.payload
    },
    setEditRoom: (state, action: any) => {
      state.editRoom = action.payload
    },
    setEditingRoomId: (state, action: any) => {
      state.editingRoomId = action.payload
    },
    setEditingRoom: (state, action: any) => {
      state.editingRoom = action.payload
    }
  }
})

export const {setRooms} = setRoomsSlice.actions
export const {setBuildings} = setRoomsSlice.actions
export const {setExistingRoom} = setRoomsSlice.actions
export const {setEditRoom} = setRoomsSlice.actions
export const {setEditingRoomId} = setRoomsSlice.actions
export const {setEditingRoom} = setRoomsSlice.actions

export default setRoomsSlice.reducer
