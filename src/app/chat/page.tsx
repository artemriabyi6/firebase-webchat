"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import Providers  from "../Providers";

const ChatWindow = dynamic(
  () => import("@/features/messages/components/ChatWindow"),
  { ssr: false }
);

export default function ChatPage() {
  return (
    <Providers>
      <Suspense fallback={<div>Loading chat...</div>}>
        <ChatWindow />
      </Suspense>
    </Providers>
  );
}



