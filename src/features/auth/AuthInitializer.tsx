// src/features/auth/AuthInitializer.tsx
"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initAuthListener  } from "./store/authThunks";

export default function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initAuthListener ());
  }, [dispatch]);

  return null;
}