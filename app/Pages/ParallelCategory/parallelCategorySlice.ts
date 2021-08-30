import {createSlice} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle

const setParallelCategorysSlice = createSlice({
  name: 'parallelCategorys',
  initialState: {
    parallelCategorys: {},
    editParallelCategory: false,
    editingParallelCategoryId: '',
    editingParallelCategory: null
  },
  reducers: {
    setParallelCategorys: (state, action: any) => {
      state.parallelCategorys = action.payload;
    },
    setEditParallelCategory: (state, action: any) => {
      state.editParallelCategory = action.payload;
    },
    setEditingParallelCategoryId: (state, action: any) => {
      state.editingParallelCategoryId = action.payload;
    },
    setEditingParallelCategory: (state, action: any) => {
      state.editingParallelCategory = action.payload;
    }
  }
});

export const {setParallelCategorys} = setParallelCategorysSlice.actions;
export const {setEditParallelCategory} = setParallelCategorysSlice.actions;
export const {setEditingParallelCategoryId} = setParallelCategorysSlice.actions;
export const {setEditingParallelCategory} = setParallelCategorysSlice.actions;

export default setParallelCategorysSlice.reducer;


