import {createSlice} from '@reduxjs/toolkit'

const setAddRoomsSlice = createSlice({
  name: 'addRooms',
  initialState: {
    rooms: {},
    buildings: {},
    tags: {},
    subjects: {},
    lecturers: {},
    groups: {},
    subGroups: {}
  },
  reducers: {
    setRooms: (state, action: any) => {
      state.rooms = action.payload
    },
    setBuildings: (state, action: any) => {
      state.buildings = action.payload
    },
    setTags: (state, action: any) => {
      state.tags = action.payload
    },
    setSubjects: (state, action: any) => {
      state.subjects = action.payload
    },
    setLecturers: (state, action: any) => {
      state.lecturers = action.payload
    },
    setGroups: (state, action: any) => {
      state.groups = action.payload
    },
    setSubGroups: (state, action: any) => {
      state.subGroups = action.payload
    }
  }
})

export const {setRooms} = setAddRoomsSlice.actions
export const {setBuildings} = setAddRoomsSlice.actions
export const {setTags} = setAddRoomsSlice.actions
export const {setSubjects} = setAddRoomsSlice.actions
export const {setLecturers} = setAddRoomsSlice.actions
export const {setGroups} = setAddRoomsSlice.actions
export const {setSubGroups} = setAddRoomsSlice.actions

export default setAddRoomsSlice.reducer
