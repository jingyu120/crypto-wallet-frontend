import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
  name: "messages",
  initialState: [],
  reducers: {
    appendMessage: (state, action) => {
      const newMessage = {
        id: new Date(Date.now()).toString(),
        room: action.payload.room,
        author: action.payload.author,
        message: action.payload.message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      state.push(newMessage);
    },
  },
});

export const { appendMessage } = messageSlice.actions;
export default messageSlice.reducer;
