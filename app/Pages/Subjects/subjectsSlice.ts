import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../store';

const setSubjectsSlice = createSlice({
  name: 'subjects',
  initialState: { subjects: [] },
  reducers: {
    setSubjects: (state, action: any) => {
      state.subjects = action.payload;
    },
  },
});

export const { setSubjects } = setSubjectsSlice.actions;

export default setSubjectsSlice.reducer;

export const selectCount = (state: RootState) => state.subjects.subjects;
