import { Credentials, UserData } from "@features/auth/lib/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "@services/firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export const signin = createAsyncThunk<UserData, Credentials>(
  "auth/signin",
  async ({ email, password }: Credentials) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const {
        displayName,
        email: userEmail,
        photoURL,
        uid,
      } = userCredential.user;
      return {
        name: displayName,
        email: userEmail,
        photoURL,
        uid,
      };
    } catch (error) {
      throw new Error(error as string);
    }
  },
);
