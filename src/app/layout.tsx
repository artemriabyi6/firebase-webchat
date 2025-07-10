// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../shared/styles/global.css";
import Providers  from "./Providers"; // Змінив ім'я імпорту
import AuthInitializer from "../features/auth/AuthInitializer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat App",
  description: "Real-time messaging application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers> 
          <AuthInitializer />
          {children}
        </Providers>
      </body>
    </html>
  );
}


