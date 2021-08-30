import {createSlice} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle

const setGroupNumsSlice = createSlice({
  name: 'groupNums',
  initialState: {
    groupNums: {},
    editGroupNum: false,
    editingGroupNumId: '',
    editingGroupNum: null
  },
  reducers: {
    setGroupNums: (state, action: any) => {
      state.groupNums = action.payload;
    },
    setEditGroupNum: (state, action: any) => {
      state.editGroupNum = action.payload;
    },
    setEditingGroupNumId: (state, action: any) => {
      state.editingGroupNumId = action.payload;
    },
    setEditingGroupNum: (state, action: any) => {
      state.editingGroupNum = action.payload;
    }
  }
});

export const {setGroupNums} = setGroupNumsSlice.actions;
export const {setEditGroupNum} = setGroupNumsSlice.actions;
export const {setEditingGroupNumId} = setGroupNumsSlice.actions;
export const {setEditingGroupNum} = setGroupNumsSlice.actions;

export default setGroupNumsSlice.reducer;


