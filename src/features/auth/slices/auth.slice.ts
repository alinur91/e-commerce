import { createSlice } from "@reduxjs/toolkit";
import {
  signup,
  signin,
  signout,
  updatePassword,
  uploadAvatar,
  removeAvatar,
} from "@features/auth/api/index";
import {
  handleUpdatePasswordRejectedState,
  handlePendingState,
  handleRejectedState,
  handleSignSignupFulfilledState,
  handleSignoutFulfilled,
  handleUpdatePasswordFulfilled,
  handleUploadAvatarFulfilledState,
  handleUpdatePasswordPendingState,
  handleUploadAvatarPendingState,
  handleUploadAvatarRejectedState,
  handleRemoveAvatarPendingState,
  handleRemoveAvatarFulfilledState,
  handleRemoveAvatarRejectedState,
} from "@features/auth/utils/helpers";
import { AuthState, UserData } from "@features/auth/lib/types";
import { LocalStorageKeyEnum, ToastNotificationsEnum } from "@ts-types/enums";
import { getLocalStorageItem } from "@utils/helpers";
import { toast } from "react-toastify";

// Get the user data from localStorage
const initialLoggedInUserData = getLocalStorageItem<UserData>(
  LocalStorageKeyEnum.LOGGED_IN_USER,
);

// Create a single slice for authentication
const authSlice = createSlice({
  name: "auth",
  initialState: {
    loggedInUser: initialLoggedInUserData, // Parse the JSON string from localStorage,
    loading: false,
    error: null as string | null,
    avatarActions: {
      uploadAvatarLoading: false,
      uploadAvatarError: null,
      removeAvatarLoading: false,
      removeAvatarError: null,
    },
    updatePasswordActions: {
      updatePasswordLoading: false,
      updatePasswordError: null as string | null,
    },
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.loading = false;
      state.loggedInUser = action.payload;
      toast.success(ToastNotificationsEnum.SUCCESS_SIGN_IN, {
        position: "bottom-right",
      });
    },
    setLoading: (state, action) => {
      console.log(action);
      state.loading = action.payload;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle signup action
    builder.addCase(signup.pending, (state) => {
      handlePendingState(state as AuthState);
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      handleSignSignupFulfilledState(
        state as AuthState,
        action.payload as UserData,
      );
    });
    builder.addCase(signup.rejected, (state, action) => {
      handleRejectedState(state as AuthState, action.error.message as string);
    });
    // Handle signin action
    builder.addCase(signin.pending, (state) => {
      handlePendingState(state as AuthState);
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      handleSignSignupFulfilledState(
        state as AuthState,
        action.payload as UserData,
      );
    });
    builder.addCase(signin.rejected, (state, action) => {
      handleRejectedState(state as AuthState, action.error.message as string);
    });
    // Handle signout action
    builder.addCase(signout.pending, (state) => {
      handlePendingState(state as AuthState);
    });
    builder.addCase(signout.fulfilled, (state) => {
      handleSignoutFulfilled(state as AuthState);
    });
    builder.addCase(signout.rejected, (state, action) => {
      handleRejectedState(state as AuthState, action.error.message as string);
    });
    // Handle updatePassword action
    builder.addCase(updatePassword.pending, (state) => {
      handleUpdatePasswordPendingState(state as AuthState);
    });
    builder.addCase(updatePassword.fulfilled, (state) => {
      handleUpdatePasswordFulfilled(state as AuthState);
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      handleUpdatePasswordRejectedState(
        state as AuthState,
        action.error.message as string,
      );
    });
    // Handle uploadAvatar action
    builder.addCase(uploadAvatar.pending, (state) => {
      handleUploadAvatarPendingState(state as AuthState);
    });
    builder.addCase(uploadAvatar.fulfilled, (state, action) => {
      handleUploadAvatarFulfilledState(state, action.payload);
    });
    builder.addCase(uploadAvatar.rejected, (state, action) => {
      handleUploadAvatarRejectedState(
        state as AuthState,
        action.error.message as string,
      );
    });
    // Handle removeAvatar action
    builder.addCase(removeAvatar.pending, (state) => {
      handleRemoveAvatarPendingState(state as AuthState);
    });
    builder.addCase(removeAvatar.fulfilled, (state, action) => {
      handleRemoveAvatarFulfilledState(state, action.payload);
    });
    builder.addCase(removeAvatar.rejected, (state, action) => {
      handleRemoveAvatarRejectedState(
        state as AuthState,
        action.error.message as string,
      );
    });
  },
});

// Export actions and reducer from the slice
export const { actions, reducer } = authSlice;
