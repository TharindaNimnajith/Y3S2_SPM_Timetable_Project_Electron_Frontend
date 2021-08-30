import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../store';

const setGroupsSlice = createSlice({
  name: 'groups',
  initialState: {
    groups: {},
    subGroups: {},
    editGroup: false,
    editingGroupId: '',
    editingGroup: null,
    showGroup: false,
    showingGroupId: '',
    showingGroup: null,
    showSubGroup: false,
    showingSubGroupId: '',
    showingSubGroup: null
  },
  reducers: {
    setGroups: (state, action: any) => {
      state.groups = action.payload;
    },
    setSubGroups: (state, action: any) => {
      state.subGroups = action.payload;
    },
    setEditGroup: (state, action: any) => {
      state.editGroup = action.payload;
    },
    setEditingGroupId: (state, action: any) => {
      state.editingGroupId = action.payload;
    },
    setEditingGroup: (state, action: any) => {
      state.editingGroup = action.payload;
    },
    setShowGroup: (state, action: any) => {
      state.showGroup = action.payload;
    },
    setShowingGroupId: (state, action: any) => {
      state.showingGroupId = action.payload;
    },
    setShowingGroup: (state, action: any) => {
      state.showingGroup = action.payload;
    },
    setShowSubGroup: (state, action: any) => {
      state.showSubGroup = action.payload;
    },
    setShowingSubGroupId: (state, action: any) => {
      state.showingSubGroupId = action.payload;
    },
    setShowingSubGroup: (state, action: any) => {
      state.showingSubGroup = action.payload;
    }
  }
});

export const {setGroups} = setGroupsSlice.actions;
export const {setSubGroups} = setGroupsSlice.actions;
export const {setEditGroup} = setGroupsSlice.actions;
export const {setEditingGroupId} = setGroupsSlice.actions;
export const {setEditingGroup} = setGroupsSlice.actions;
export const {setShowGroup} = setGroupsSlice.actions;
export const {setShowingGroupId} = setGroupsSlice.actions;
export const {setShowingGroup} = setGroupsSlice.actions;
export const {setShowSubGroup} = setGroupsSlice.actions;
export const {setShowingSubGroupId} = setGroupsSlice.actions;
export const {setShowingSubGroup} = setGroupsSlice.actions;

export default setGroupsSlice.reducer;

export const selectCount = (state: RootState) => state.groups.groups;
