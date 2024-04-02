import { AuthState, UserData } from "@features/auth/lib/types";
import { CartState } from "@features/cart/lib/types";
import { ProductsState } from "@features/products/lib/types";
import { LocalStorageKeyEnum, ToastNotificationsEnum } from "@ts-types/enums";
import { removeLocalStorageItem, setLocalStorageItem } from "@utils/helpers";
import { toast } from "react-toastify";

//SIGN IN, SIGN UP
export const handlePendingState = (
  state: AuthState | ProductsState | CartState,
) => {
  state.loading = true;
  state.error = null;
};
export const handleSignSignupFulfilledState = (
  state: AuthState,
  userData: UserData,
) => {
  state.loading = false;
  state.loggedInUser = userData;
  setLocalStorageItem(LocalStorageKeyEnum.LOGGED_IN_USER, userData);
  toast.success(ToastNotificationsEnum.SUCCESS_SIGN_IN, {
    position: "bottom-right",
    autoClose: 1000,
  });
};
export const handleRejectedState = (
  state: AuthState | ProductsState | CartState,
  message: string,
) => {
  state.loading = false;
  state.error = message;
  toast.error(message, { position: "bottom-right", autoClose: 1000 });
};

//SIGN OUT
export const handleSignoutFulfilled = (state: AuthState) => {
  state.loading = false;
  state.loggedInUser = null;
  state.error = null;
  state.avatarActions.uploadAvatarError = null;
  state.avatarActions.removeAvatarError = null;
  state.updatePasswordActions.updatePasswordError = null;
  removeLocalStorageItem(LocalStorageKeyEnum.LOGGED_IN_USER);
  removeLocalStorageItem(LocalStorageKeyEnum.FILTERS);
  toast.success(ToastNotificationsEnum.SUCCESS_SIGN_OUT, {
    position: "bottom-right",
    autoClose: 1000,
  });
};

// UPDATE PASSWORD
export const handleUpdatePasswordPendingState = (state: AuthState) => {
  state.updatePasswordActions.updatePasswordLoading = true;
  state.updatePasswordActions.updatePasswordError = null;
};
export const handleUpdatePasswordFulfilled = (state: AuthState) => {
  state.updatePasswordActions.updatePasswordLoading = false;
  toast.info(ToastNotificationsEnum.SUCCESS_UPDATE_PASSWORD, {
    position: "bottom-center",
    autoClose: 1000,
  });
};
export const handleUpdatePasswordRejectedState = (
  state: AuthState,
  message: string,
) => {
  state.updatePasswordActions.updatePasswordLoading = false;
  state.updatePasswordActions.updatePasswordError = message;
  toast.error(message, { position: "bottom-center", autoClose: 1000 });
};

//UPLOAD AVATAR
export const handleUploadAvatarPendingState = (state: AuthState) => {
  state.avatarActions.uploadAvatarLoading = true;
  state.avatarActions.uploadAvatarError = null;
};
export const handleUploadAvatarFulfilledState = (
  state: AuthState,
  photoURL: string,
) => {
  const loggedInUserData = {
    ...state.loggedInUser,
    photoURL,
  } as UserData;
  state.loggedInUser = loggedInUserData;
  state.avatarActions.uploadAvatarLoading = false;
  state.avatarActions.uploadAvatarError = null;
  setLocalStorageItem(LocalStorageKeyEnum.LOGGED_IN_USER, loggedInUserData);
  toast.info(ToastNotificationsEnum.SUCCESS_UPDATE_AVATAR, {
    position: "top-center",
    autoClose: 1000,
  });
};
export const handleUploadAvatarRejectedState = (
  state: AuthState,
  message: string,
) => {
  state.avatarActions.uploadAvatarLoading = false;
  state.avatarActions.uploadAvatarError = message;
  toast.error(message, { position: "top-center", autoClose: 1000 });
};

//REMOVE AVATAR
export const handleRemoveAvatarPendingState = (state: AuthState) => {
  state.avatarActions.removeAvatarLoading = true;
  state.avatarActions.uploadAvatarError = null;
};
export const handleRemoveAvatarFulfilledState = (
  state: AuthState,
  photoURL: null,
) => {
  const loggedInUserData = {
    ...state.loggedInUser,
    photoURL,
  } as UserData;
  state.loggedInUser = loggedInUserData;
  state.avatarActions.removeAvatarLoading = false;
  state.avatarActions.removeAvatarError = null;
  setLocalStorageItem(LocalStorageKeyEnum.LOGGED_IN_USER, loggedInUserData);
  toast.info(ToastNotificationsEnum.SUCCESS_REMOVE_AVATAR, {
    position: "top-center",
    autoClose: 1000,
  });
};
export const handleRemoveAvatarRejectedState = (
  state: AuthState,
  message: string,
) => {
  state.avatarActions.removeAvatarLoading = false;
  state.avatarActions.removeAvatarError = message;
  toast.error(message, { position: "top-center", autoClose: 1000 });
};
