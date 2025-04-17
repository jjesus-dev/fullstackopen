import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setMessage(state, action) {
      const message = action.payload;

      return message === undefined ? state : message;
    },
  }
})

export const { setMessage } = notificationSlice.actions

export const setNotification = (message, duration) => {
  return async (dispatch) => {
    dispatch(setMessage(message))
    setTimeout(() => {
      dispatch(setMessage(''))
    }, duration * 1000);
  }
}

export default notificationSlice.reducer