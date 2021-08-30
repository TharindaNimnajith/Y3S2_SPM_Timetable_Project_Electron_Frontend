import {createSlice} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle

const setTagsSlice = createSlice({
  name: 'tags',
  initialState: {
    tags: {},
    editTag: false,
    editingTagId: '',
    editingTag: null
  },
  reducers: {
    setTags: (state, action: any) => {
      state.tags = action.payload;
    },
    setEditTag: (state, action: any) => {
      state.editTag = action.payload;
    },
    setEditingTagId: (state, action: any) => {
      state.editingTagId = action.payload;
    },
    setEditingTag: (state, action: any) => {
      state.editingTag = action.payload;
    }
  }
});

export const {setTags} = setTagsSlice.actions;
export const {setEditTag} = setTagsSlice.actions;
export const {setEditingTagId} = setTagsSlice.actions;
export const {setEditingTag} = setTagsSlice.actions;

export default setTagsSlice.reducer;


