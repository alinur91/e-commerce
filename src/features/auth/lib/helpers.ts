import { AuthState, UserData } from "@features/auth/lib/types";
import { CartState } from "@features/cart/lib/types";
import { OrderState } from "@features/order/lib/types";
import { ProductsState } from "@features/products/lib/types";
import {
  LocalStorageKeyEnum,
  ToastNotificationsMessageEnum,
  ToastPositionNotificationsEnum,
  ToastTypeNotificationsEnum,
} from "@ts-types/enums";
import {
  removeLocalStorageItem,
  setLocalStorageItem,
  showToastNotificationMessage,
} from "@utils/helpers";

//SIGN IN, SIGN UP
export const handlePendingState = (
  state: AuthState | ProductsState | CartState | OrderState,
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
  showToastNotificationMessage(
    ToastTypeNotificationsEnum.SUCCESS,
    ToastNotificationsMessageEnum.SUCCESS_SIGN_IN,
    ToastPositionNotificationsEnum.BOTTOM_RIGHT,
  );
};

export const handleRejectedState = (
  state: AuthState | ProductsState | CartState | OrderState,
  message: string,
) => {
  state.loading = false;
  state.error = message;
  showToastNotificationMessage(
    ToastTypeNotificationsEnum.ERROR,
    message,
    ToastPositionNotificationsEnum.BOTTOM_RIGHT,
  );
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
  showToastNotificationMessage(
    ToastTypeNotificationsEnum.SUCCESS,
    ToastNotificationsMessageEnum.SUCCESS_SIGN_OUT,
    ToastPositionNotificationsEnum.BOTTOM_RIGHT,
  );
};

// UPDATE PASSWORD
export const handleUpdatePasswordPendingState = (state: AuthState) => {
  state.updatePasswordActions.updatePasswordLoading = true;
  state.updatePasswordActions.updatePasswordError = null;
};

export const handleUpdatePasswordFulfilled = (state: AuthState) => {
  state.updatePasswordActions.updatePasswordLoading = false;
  showToastNotificationMessage(
    ToastTypeNotificationsEnum.INFO,
    ToastNotificationsMessageEnum.SUCCESS_UPDATE_PASSWORD,
    ToastPositionNotificationsEnum.BOTTOM_CENTER,
  );
};

export const handleUpdatePasswordRejectedState = (
  state: AuthState,
  message: string,
) => {
  state.updatePasswordActions.updatePasswordLoading = false;
  state.updatePasswordActions.updatePasswordError = message;
  showToastNotificationMessage(
    ToastTypeNotificationsEnum.ERROR,
    message,
    ToastPositionNotificationsEnum.BOTTOM_CENTER,
  );
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
  showToastNotificationMessage(
    ToastTypeNotificationsEnum.INFO,
    ToastNotificationsMessageEnum.SUCCESS_UPDATE_AVATAR,
    ToastPositionNotificationsEnum.BOTTOM_CENTER,
  );
};

export const handleUploadAvatarRejectedState = (
  state: AuthState,
  message: string,
) => {
  state.avatarActions.uploadAvatarLoading = false;
  state.avatarActions.uploadAvatarError = message;
  showToastNotificationMessage(
    ToastTypeNotificationsEnum.ERROR,
    message,
    ToastPositionNotificationsEnum.BOTTOM_CENTER,
  );
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
  showToastNotificationMessage(
    ToastTypeNotificationsEnum.INFO,
    ToastNotificationsMessageEnum.SUCCESS_REMOVE_AVATAR,
    ToastPositionNotificationsEnum.TOP_CENTER,
  );
};

export const handleRemoveAvatarRejectedState = (
  state: AuthState,
  message: string,
) => {
  state.avatarActions.removeAvatarLoading = false;
  state.avatarActions.removeAvatarError = message;
  showToastNotificationMessage(
    ToastTypeNotificationsEnum.ERROR,
    message,
    ToastPositionNotificationsEnum.TOP_CENTER,
  );
};
