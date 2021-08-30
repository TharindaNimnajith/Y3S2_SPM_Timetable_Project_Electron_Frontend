import {createSlice} from '@reduxjs/toolkit'

const setLecturersStatisticsSlice = createSlice({
  name: 'lecturersStatistics',
  initialState: {
    lecturersCenterStatistics: [],
    lecturersFacultyStatistics: [],
    lecturersLevelStatistics: []
  },
  reducers: {
    setLecturersCenterStatistics: (state, action: any) => {
      state.lecturersCenterStatistics = action.payload
    },
    setLecturersFacultyStatistics: (state, action: any) => {
      state.lecturersFacultyStatistics = action.payload
    },
    setLecturersLevelStatistics: (state, action: any) => {
      state.lecturersLevelStatistics = action.payload
    }
  }
})

export const {setLecturersCenterStatistics} = setLecturersStatisticsSlice.actions
export const {setLecturersFacultyStatistics} = setLecturersStatisticsSlice.actions
export const {setLecturersLevelStatistics} = setLecturersStatisticsSlice.actions

export default setLecturersStatisticsSlice.reducer
