"use client"

import { useEffect } from "react"
import { Provider, useDispatch } from "react-redux"
import { store } from "../store"
import { initAuthListener } from "../features/auth/store/authThunks"

export function AppProviders({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initAuthListener())
  }, [dispatch])

  return <>{children}</>
}

export default function ProvidersWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AppProviders>{children}</AppProviders>
    </Provider>
  )
}
