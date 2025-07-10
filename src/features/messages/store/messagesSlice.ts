import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
}

const initialState: Message[] = [];

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.push(action.payload);
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      return action.payload;
    },
    clearMessages: (state) => {
      return initialState;
    }
  },
});

export const { addMessage, setMessages, clearMessages } = messagesSlice.actions;
export default messagesSlice.reducer;