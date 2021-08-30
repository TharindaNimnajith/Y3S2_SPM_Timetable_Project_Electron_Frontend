import {createSlice} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle

const setNotAvailablesSlice = createSlice({
  name: 'notAvailables',
  initialState: {
    notAvailables: {},
    editNotAvailable: false,
    editingNotAvailableId: '',
    editingNotAvailable: null
  },
  reducers: {
    setNotAvailables: (state, action: any) => {
      state.notAvailables = action.payload;
    },
    setEditNotAvailable: (state, action: any) => {
      state.editNotAvailable = action.payload;
    },
    setEditingNotAvailableId: (state, action: any) => {
      state.editingNotAvailableId = action.payload;
    },
    setEditingNotAvailable: (state, action: any) => {
      state.editingNotAvailable = action.payload;
    }
  }
});

export const {setNotAvailables} = setNotAvailablesSlice.actions;
export const {setEditNotAvailable} = setNotAvailablesSlice.actions;
export const {setEditingNotAvailableId} = setNotAvailablesSlice.actions;
export const {setEditingNotAvailable} = setNotAvailablesSlice.actions;

export default setNotAvailablesSlice.reducer;


