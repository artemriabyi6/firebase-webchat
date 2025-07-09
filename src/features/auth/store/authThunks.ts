// src/app/features/auth/store/authThunks.ts
import { AppDispatch } from "../../../store"
import { auth } from "../../../shared/lib/firebase"
import { setUser, setLoading } from "./authSlice"
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth"

// 🔄 Ініціалізація слухача автентифікації
export const initAuthListener = () => (dispatch: AppDispatch) => {
  dispatch(setLoading(true))

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // ✅ передаємо лише серіалізовані дані
      dispatch(setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      }))
    } else {
      dispatch(setUser(null))
    }

    dispatch(setLoading(false))
  })
}

// 🔐 Логін користувача
export const loginUser = (email: string, password: string) => async (dispatch: AppDispatch) => {
  await signInWithEmailAndPassword(auth, email, password)
}

// 🆕 Реєстрація користувача
export const registerUser = (email: string, password: string) => async (dispatch: AppDispatch) => {
  await createUserWithEmailAndPassword(auth, email, password)
}

// 🚪 Вихід з акаунту
export const logoutUser = () => async (dispatch: AppDispatch) => {
  await signOut(auth)
}
