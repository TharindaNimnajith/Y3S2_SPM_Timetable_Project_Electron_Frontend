import {createSlice} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle

const setYearSemsSlice = createSlice({
  name: 'yearSems',
  initialState: {
    yearSems: {},
    editYearSem: false,
    editingYearSemId: '',
    editingYearSem: null
  },
  reducers: {
    setYearSems: (state, action: any) => {
      state.yearSems = action.payload;
    },
    setEditYearSem: (state, action: any) => {
      state.editYearSem = action.payload;
    },
    setEditingYearSemId: (state, action: any) => {
      state.editingYearSemId = action.payload;
    },
    setEditingYearSem: (state, action: any) => {
      state.editingYearSem = action.payload;
    }
  }
});

export const {setYearSems} = setYearSemsSlice.actions;
export const {setEditYearSem} = setYearSemsSlice.actions;
export const {setEditingYearSemId} = setYearSemsSlice.actions;
export const {setEditingYearSem} = setYearSemsSlice.actions;

export default setYearSemsSlice.reducer;


