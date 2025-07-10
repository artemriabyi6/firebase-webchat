// src/features/chat/components/ChatWindow.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/shared/lib/firebase";
import { useChatSocket } from "../hooks/useChatSocket";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/features/auth/store/authThunks";
import { useDispatch } from "react-redux";

export default function ChatWindow() {
  const [user] = useAuthState(auth);
  const [text, setText] = useState("");
  const messages = useSelector((state: RootState) => state.messages);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { connect, disconnect, sendMessage } = useChatSocket();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.email) {
      connect();
    }
    return () => {
      disconnect();
    };
  }, [user, connect, disconnect]);

  const handleLogout = async () => {
    try {
      disconnect();
      await auth.signOut();
      dispatch(logoutUser());
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleSend = () => {
    if (text.trim() && user?.email) {
      sendMessage(text, user.email);
      setText("");
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="max-w-2xl mx-auto mt-10 border rounded-lg shadow-md flex flex-col h-[80vh]">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="font-bold text-lg">Chat</h2>
        <button
          className="text-sm text-red-500 hover:underline"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded-md max-w-[80%] ${
              msg.sender === user?.email
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-200 text-black self-start mr-auto"
            }`}
          >
            <p className="text-sm font-semibold">{msg.sender}</p>
            <p>{msg.text}</p>
            <p className="text-xs opacity-70">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </p>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      <div className="p-4 border-t flex items-center gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}