"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../features/auth/hooks/useAuth"
import { useDispatch } from "react-redux"
import { logoutUser } from "../../features/auth/store/authThunks"

export default function ChatClient() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login")
    }
  }, [user, loading, router])

  if (loading) return <div>Loading...</div>
  if (!user) return null

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Welcome, {user.email}</h1>
      <button
        onClick={() => {
          dispatch(logoutUser())
          router.replace("/login")
        }}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
      {/* Тут пізніше буде чат */}
    </div>
  )
}
