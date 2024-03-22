import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "@services/firebase/firebaseConfig";
import { signOut } from "firebase/auth";

export const signout = createAsyncThunk("auth/signout", async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(error as string);
  }
});
