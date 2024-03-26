import { createAsyncThunk } from "@reduxjs/toolkit";
import { ref, deleteObject } from "firebase/storage";
import { RootState } from "@services/store/store";
import { auth, storage } from "@services/firebase/firebaseConfig";
import { User, updateProfile } from "firebase/auth";

// Define an asynchronous action creator to remove the avatar
export const removeAvatar = createAsyncThunk(
  "auth/removeAvatar",
  async (_, { getState }) => {
    try {
      // Get the current state to access the user data
      const state = getState() as RootState;
      const userId = state.auth.loggedInUser?.uid;

      if (!userId) {
        throw new Error("User ID not found");
      }

      // Delete the avatar from Firebase Storage
      const storageRef = ref(storage, `avatars/${userId}`);
      await deleteObject(storageRef);

      // Update the user's profile to remove the photoURL.Empty string treated as null in firebase authentication
      await updateProfile(auth.currentUser as User, { photoURL: "" });
      // Return null to indicate successful removal
      return null;
    } catch (error) {
      throw new Error("Failed to remove avatar: " + error);
    }
  },
);
