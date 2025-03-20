import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projects: [],
  loading: false,
  error: null,
  selectedType: null,
  viewMode: 'map' // 'map' or 'list'
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setSelectedType: (state, action) => {
      state.selectedType = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    }
  }
});

export const { setProjects, setLoading, setError, setSelectedType, setViewMode } = projectSlice.actions;
export default projectSlice.reducer; 