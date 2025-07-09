"use client"

import { useEffect } from "react"
import { Provider } from "react-redux"
import { store } from "../store"
import { initAuthListener } from "../features/auth/store/authThunks"

export default function ProvidersWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    store.dispatch(initAuthListener())
  }, [])

  return <Provider store={store}>{children}</Provider>
}
