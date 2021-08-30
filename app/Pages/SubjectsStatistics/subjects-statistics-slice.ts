import {createSlice} from '@reduxjs/toolkit'

const setSubjectsStatisticsSlice = createSlice({
  name: 'subjectsStatistics',
  initialState: {
    subjectsTotalCountStatistics: null,
    subjectsOfferedYearStatistics: [],
    subjectsOfferedYearSemesterStatistics: []
  },
  reducers: {
    setSubjectsTotalCountStatistics: (state, action: any) => {
      state.subjectsTotalCountStatistics = action.payload
    },
    setSubjectsOfferedYearStatistics: (state, action: any) => {
      state.subjectsOfferedYearStatistics = action.payload
    },
    setSubjectsOfferedYearSemesterStatistics: (state, action: any) => {
      state.subjectsOfferedYearSemesterStatistics = action.payload
    }
  }
})

export const {setSubjectsTotalCountStatistics} = setSubjectsStatisticsSlice.actions
export const {setSubjectsOfferedYearStatistics} = setSubjectsStatisticsSlice.actions
export const {setSubjectsOfferedYearSemesterStatistics} = setSubjectsStatisticsSlice.actions

export default setSubjectsStatisticsSlice.reducer
