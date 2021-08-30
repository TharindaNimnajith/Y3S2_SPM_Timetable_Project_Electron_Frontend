import {createSlice} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle

const setSubGroupNumsSlice = createSlice({
  name: 'subGroupNums',
  initialState: {
    subGroupNums: {},
    editSubGroupNum: false,
    editingSubGroupNumId: '',
    editingSubGroupNum: null
  },
  reducers: {
    setSubGroupNums: (state, action: any) => {
      state.subGroupNums = action.payload;
    },
    setEditSubGroupNum: (state, action: any) => {
      state.editSubGroupNum = action.payload;
    },
    setEditingSubGroupNumId: (state, action: any) => {
      state.editingSubGroupNumId = action.payload;
    },
    setEditingSubGroupNum: (state, action: any) => {
      state.editingSubGroupNum = action.payload;
    }
  }
});

export const {setSubGroupNums} = setSubGroupNumsSlice.actions;
export const {setEditSubGroupNum} = setSubGroupNumsSlice.actions;
export const {setEditingSubGroupNumId} = setSubGroupNumsSlice.actions;
export const {setEditingSubGroupNum} = setSubGroupNumsSlice.actions;

export default setSubGroupNumsSlice.reducer;


