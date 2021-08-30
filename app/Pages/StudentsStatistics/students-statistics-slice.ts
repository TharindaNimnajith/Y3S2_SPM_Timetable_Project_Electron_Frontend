import {createSlice} from '@reduxjs/toolkit'

const setStudentsStatisticsSlice = createSlice({
  name: 'studentsStatistics',
  initialState: {
    studentsYearStatistics: [],
    studentsYearSemesterStatistics: [],
    studentsYearSemesterProgrammeStatistics: []
  },
  reducers: {
    setStudentsYearStatistics: (state, action: any) => {
      state.studentsYearStatistics = action.payload
    },
    setStudentsYearSemesterStatistics: (state, action: any) => {
      state.studentsYearSemesterStatistics = action.payload
    },
    setStudentsYearSemesterProgrammeStatistics: (state, action: any) => {
      state.studentsYearSemesterProgrammeStatistics = action.payload
    }
  }
})

export const {setStudentsYearStatistics} = setStudentsStatisticsSlice.actions
export const {setStudentsYearSemesterStatistics} = setStudentsStatisticsSlice.actions
export const {setStudentsYearSemesterProgrammeStatistics} = setStudentsStatisticsSlice.actions

export default setStudentsStatisticsSlice.reducer
