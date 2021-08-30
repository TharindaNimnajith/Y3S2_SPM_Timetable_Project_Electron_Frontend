import {createSlice} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import {RootState} from '../../store';

const setLecturersSlice = createSlice({
  name: 'lecturers',
  initialState: {lecturers: []},
  reducers: {
    setLecturers: (state, action: any) => {
      state.lecturers = action.payload;
    },
  },
});

export const {setLecturers} = setLecturersSlice.actions;

export default setLecturersSlice.reducer;

export const selectCount = (state: RootState) => state.lecturers.lecturers;
