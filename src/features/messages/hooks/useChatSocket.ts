// src/features/chat/hooks/useChatSocket.ts
import {  useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { useDispatch } from "react-redux";
import { addMessage } from "../store/messagesSlice";

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
}

export function useChatSocket() {
  const socketRef = useRef<Socket | null>(null);
  const dispatch = useDispatch();

  const connect = useCallback(() => {
    if (socketRef.current?.connected) return;

    const socket = io("http://localhost:3001", {
      transports: ["websocket", "polling"],
      autoConnect: false,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected, id:", socket.id);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    socket.on("chat-message", (msg: Message) => {
      console.log("Received message:", msg);
      dispatch(addMessage(msg));
    });

    socket.connect();
  }, [dispatch]);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      console.log("Disconnecting socket...");
      socketRef.current.disconnect();
      socketRef.current = null;
    }
  }, []);

  const sendMessage = useCallback((text: string, sender: string) => {
    if (!socketRef.current?.connected) return;

    const message: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date().toISOString(),
    };

    console.log("Sending message:", message);
    socketRef.current.emit("chat-message", message);
  }, []);

  return { connect, disconnect, sendMessage };
}