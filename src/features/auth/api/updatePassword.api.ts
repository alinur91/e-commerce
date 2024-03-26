import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAuth,
  updatePassword as updateFirebasePassword,
} from "firebase/auth";

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (newPassword: string, { rejectWithValue }) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      return rejectWithValue("No user is currently signed in.");
    }
    try {
      await updateFirebasePassword(user, newPassword);
    } catch (error) {
      throw new Error(error as string);
    }
  },
);
