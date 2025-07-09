// src/app/features/auth/store/authThunks.ts
import { AppDispatch } from "../../../store/index"
import { auth } from "../../../shared/lib/firebase"
import { setUser, setLoading } from "./authSlice"
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth"

// Ініціалізація спостерігача
export const initAuthListener = () => (dispatch: AppDispatch) => {
  dispatch(setLoading(true))
  onAuthStateChanged(auth, (user) => {
    dispatch(setUser(user))
    dispatch(setLoading(false))
  })
}

export const loginUser = (email: string, password: string) => async (dispatch: AppDispatch) => {
  await signInWithEmailAndPassword(auth, email, password)
}

export const registerUser = (email: string, password: string) => async (dispatch: AppDispatch) => {
  await createUserWithEmailAndPassword(auth, email, password)
}

export const logoutUser = () => async (dispatch: AppDispatch) => {
  await signOut(auth)
}
