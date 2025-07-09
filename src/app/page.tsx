"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/shared/lib/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useClient } from "@/shared/hooks/useClient"

export default function ChatPage() {
  const [user, loading, error] = useAuthState(auth)
  const router = useRouter()
  const mounted = useClient()

  useEffect(() => {
    if (!mounted) return

    if (!loading && !user) {
      router.replace("/login")
    }
  }, [user, loading, mounted, router])

  if (!mounted || loading) {
    return <div className="text-center mt-10">Loading...</div>
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500">
        Error: {error.message}
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 border rounded-md shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Welcome, {user.email}</h1>
        <button
          onClick={async () => {
            await auth.signOut()
            router.push("/login")
          }}
          className="text-sm text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="border-t pt-4">
        <p>Chat content coming soon...</p>
      </div>
    </div>
  )
}
