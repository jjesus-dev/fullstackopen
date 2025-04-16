import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'Dummy message',
  reducers: {
    showNotification(state, action) {
      return state
    }
  }
})

export const { filterAnecdotes } = notificationSlice.actions
export default notificationSlice.reducer