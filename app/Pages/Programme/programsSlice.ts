import {createSlice} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle

const setProgramsSlice = createSlice({
  name: 'programs',
  initialState: {
    programs: {},
    editProgram: false,
    editingProgramId: '',
    editingProgram: null
  },
  reducers: {
    setPrograms: (state, action: any) => {
      state.programs = action.payload;
    },
    setEditProgram: (state, action: any) => {
      state.editProgram = action.payload;
    },
    setEditingProgramId: (state, action: any) => {
      state.editingProgramId = action.payload;
    },
    setEditingProgram: (state, action: any) => {
      state.editingProgram = action.payload;
    }
  }
});

export const {setPrograms} = setProgramsSlice.actions;
export const {setEditProgram} = setProgramsSlice.actions;
export const {setEditingProgramId} = setProgramsSlice.actions;
export const {setEditingProgram} = setProgramsSlice.actions;

export default setProgramsSlice.reducer;


