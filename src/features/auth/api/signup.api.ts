import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "@services/firebase/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Credentials, UserData } from "@features/auth/lib/types";

export const signup = createAsyncThunk<UserData, Credentials>(
  "signup",
  async ({ email, password, name }: Credentials) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await updateProfile(userCredential.user, { displayName: name });
      const { displayName, email: userEmail, photoURL } = userCredential.user;
      return {
        name: displayName,
        email: userEmail,
        photoURL,
      };
    } catch (error) {
      throw new Error(error as string);
    }
  },
);
