import { createSlice } from "@reduxjs/toolkit";
import { signup, signin, signout } from "@features/auth/api/index";
import { toast } from "react-toastify";
import { removeLocalStorageItem, setLocalStorageItem } from "@utils/helpers";
import { LocalStorageKeyEnum, ToastNotificationsEnum } from "@ts-types/enums";

// Get the user data from localStorage
const initialUserData = localStorage.getItem("loggedInUser");

// Create a single slice for authentication
const authSlice = createSlice({
  name: "auth",
  initialState: {
    loggedInUser: initialUserData ? JSON.parse(initialUserData) : null, // Parse the JSON string from localStorage,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setErrorToNull(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle signup action
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.loading = false;
      state.loggedInUser = action.payload;
      setLocalStorageItem(LocalStorageKeyEnum.LOGGED_IN_USER, action.payload);
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    // Handle signin action
    builder.addCase(signin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      state.loading = false;
      state.loggedInUser = action.payload;
      setLocalStorageItem(LocalStorageKeyEnum.LOGGED_IN_USER, action.payload);
    });
    builder.addCase(signin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    // Handle signout action
    builder.addCase(signout.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signout.fulfilled, (state) => {
      state.loading = false;
      state.loggedInUser = null;
      removeLocalStorageItem(LocalStorageKeyEnum.LOGGED_IN_USER);
      removeLocalStorageItem(LocalStorageKeyEnum.LOGGED_IN_TOAST_SHOWN);
      toast.success(ToastNotificationsEnum.SUCCESS_SIGN_OUT, {
        position: "bottom-right",
        toastId: "signoutSuccess",
      });
    });
    builder.addCase(signout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
  },
});

// Export actions and reducer from the slice
export const { actions, reducer } = authSlice;
