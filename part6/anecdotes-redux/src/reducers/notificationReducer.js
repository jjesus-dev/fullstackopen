import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    creationNotification(state, action) {
      const message = `You created a new anecdote ("${action.payload}")!`;

      return message === undefined ? state : message;
    },
    voteNotification(state, action) {
      const message = `You voted "${action.payload}"!`;

      return message === undefined ? state : message;
    },
    clearNotification(state, action) {
      const message = action.payload;

      return message;
    }
  }
})

export const { 
  creationNotification,
  voteNotification,
  clearNotification
} = notificationSlice.actions
export default notificationSlice.reducer