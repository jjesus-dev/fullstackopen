import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterAnecdotes(state, action) {
      const filter = action.payload;

      return filter === undefined ? state : filter;
    }
  }
})

export const { filterAnecdotes } = filterSlice.actions
export default filterSlice.reducer