import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: 'notificacion',
  initialState: {
    notification: {}
  },
  reducers: {
    setMessage: (state, action) => {
      state.notification.push = {
        message: action.payload.message,
        type: action.payload.type
      }
    }
  }
})

export const { setMessage } = notificationSlice.actions
export default notificationSlice.reducer