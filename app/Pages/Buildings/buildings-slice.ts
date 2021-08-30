import {createSlice} from '@reduxjs/toolkit'

const setBuildingsSlice = createSlice({
  name: 'buildings',
  initialState: {
    buildings: {},
    centers: {},
    existingBuilding: false,
    editBuilding: false,
    editingBuildingId: '',
    editingBuilding: null,
    existingRoomsForBuilding: false
  },
  reducers: {
    setBuildings: (state, action: any) => {
      state.buildings = action.payload
    },
    setCenters: (state, action: any) => {
      state.centers = action.payload
    },
    setExistingBuilding: (state, action: any) => {
      state.existingBuilding = action.payload
    },
    setEditBuilding: (state, action: any) => {
      state.editBuilding = action.payload
    },
    setEditingBuildingId: (state, action: any) => {
      state.editingBuildingId = action.payload
    },
    setEditingBuilding: (state, action: any) => {
      state.editingBuilding = action.payload
    },
    setExistingRoomsForBuilding: (state, action: any) => {
      state.existingRoomsForBuilding = action.payload
    }
  }
})

export const {setBuildings} = setBuildingsSlice.actions
export const {setCenters} = setBuildingsSlice.actions
export const {setExistingBuilding} = setBuildingsSlice.actions
export const {setEditBuilding} = setBuildingsSlice.actions
export const {setEditingBuildingId} = setBuildingsSlice.actions
export const {setEditingBuilding} = setBuildingsSlice.actions
export const {setExistingRoomsForBuilding} = setBuildingsSlice.actions

export default setBuildingsSlice.reducer
