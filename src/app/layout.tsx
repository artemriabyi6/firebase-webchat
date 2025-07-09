import ProvidersWrapper from "./Providers"
import '../shared/styles/global.css'
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chat App",
  description: "Real-time messenger built with Next.js",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ProvidersWrapper>{children}</ProvidersWrapper>
      </body>
    </html>
  )
}

