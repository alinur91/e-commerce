import { createSlice } from "@reduxjs/toolkit";
import { UserData } from "@features/auth/lib/types";
import { signup } from "@features/auth/api/signup.api";
import { signin } from "@features/auth/api/signin.api";

// Create a single slice for authentication
const authSlice = createSlice({
  name: "auth",
  initialState: {
    loggedInUser: null as UserData | null,
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
    });
    builder.addCase(signin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
  },
});

// Export actions and reducer from the slice
export const { actions, reducer } = authSlice;
