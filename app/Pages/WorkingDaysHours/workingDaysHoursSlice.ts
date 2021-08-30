import {createSlice} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import {RootState} from '../../store';

const setWorkingDaysHoursSlice = createSlice({
  name: 'workingDaysHours',
  initialState: {workingDaysHours: {}},
  reducers: {
    setWorkingDaysHours: (state, action: any) => {
      state.workingDaysHours = action.payload;
    }
  }
});

export const {setWorkingDaysHours} = setWorkingDaysHoursSlice.actions;

export default setWorkingDaysHoursSlice.reducer;

export const selectCount = (state: RootState) =>
  state.workingDaysHours.workingDaysHours;
