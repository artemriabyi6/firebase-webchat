// src/features/auth/store/authThunks.ts
import { AppDispatch } from "../../../store";
import { auth } from "../../../shared/lib/firebase";
import { setUser, setLoading } from "./authSlice";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export const initAuthListener = () => (dispatch: AppDispatch) => {
  dispatch(setLoading(true));

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
      );
    } else {
      dispatch(setUser(null));
    }
    dispatch(setLoading(false));
  });
};

export const loginUser =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

export const registerUser =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

export const logoutUser = () => async (dispatch: AppDispatch) => {
  try {
    await signOut(auth);
    dispatch(setUser(null));
  } catch (error) {
    console.error("Logout error:", error);
  }
};
