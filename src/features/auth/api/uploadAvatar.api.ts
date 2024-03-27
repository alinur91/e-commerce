import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { RootState } from "@services/store/store";
import { auth, storage } from "@services/firebase/firebaseConfig";
import { User, updateProfile } from "firebase/auth";

// Define an asynchronous action creator using createAsyncThunk
export const uploadAvatar = createAsyncThunk<string, File>(
  "auth/uploadAvatar",
  async (file: File, { getState }) => {
    try {
      // Get the current state to access the user data
      const state = getState() as RootState;
      const userId = state.auth.loggedInUser?.uid;

      if (!userId) {
        throw new Error("User ID not found");
      }
      // Upload the file to Firebase Storage
      const storageRef = ref(storage, `avatars/${userId}`);
      await uploadBytes(storageRef, file);
      // Get the download URL of the uploaded file
      const downloadURL = await getDownloadURL(storageRef);

      // Update the user's profile with the new photoURL
      await updateProfile(auth.currentUser as User, { photoURL: downloadURL });

      // Return the download URL to be stored in the Redux state
      return downloadURL;
    } catch (error) {
      throw new Error("Failed to upload avatar: " + error);
    }
  },
);
