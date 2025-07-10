// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/store/authSlice"
import messagesReducer from '../features/messages/store/messagesSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    messages: messagesReducer

  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
