import { createSlice } from '@reduxjs/toolkit'

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: { selectedMovies: null },
  reducers: {
    setCategories: (
      state,
      action
    ) => {
      state.selectedMovies = action.payload.selectedMovies
    },
  },
})

export const { setCategories } = categoriesSlice.actions;

export const catReducer = categoriesSlice.reducer;