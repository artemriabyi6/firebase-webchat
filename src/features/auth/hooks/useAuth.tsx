// src/app/features/auth/hooks/useAuth.ts
import { useSelector } from "react-redux"
import { RootState } from "@/store"

export const useAuth = () => {
  const { user, loading } = useSelector((state: RootState) => state.auth)
  return { user, loading }
}

