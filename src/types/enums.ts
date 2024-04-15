export enum ButtonEnum {
  PRIMARY = "PRIMARY",
  LIGHT = "LIGHT",
  WARNING = "WARNING",
  DANGER = "DANGER",
  SECONDARY = "SECONDARY",
}

export enum AuthenticationPagesEnum {
  Login = "LOGIN",
  Signup = "SIGNUP",
  Reset_Password = "RESET_PASSWORD",
}

export enum StarRatingSizeEnum {
  "large" = "LARGE",
  "small" = "SMALL",
}

export enum NoDataResultsMessageEnum {
  NoMatch = "We're sorry. We were not able to find a match 😒",
  HelloMessage = "Hello, what are you feeling to shop today... 😉",
}

export enum PagesEnum {
  "search" = "SEARCH",
  "home" = "HOME",
}

export enum LocalStorageKeyEnum {
  LOGGED_IN_USER = "loggedInUser",
  FILTERS = "filters",
}

export enum ToastNotificationsMessageEnum {
  SUCCESS_SIGN_IN = "Successfully signed in",
  SUCCESS_SIGN_OUT = "Successfully signed out",
  SUCCESS_UPDATE_PASSWORD = "Password successfully updated",
  SUCCESS_UPDATE_AVATAR = "Avatar successfully uploaded",
  SUCCESS_REMOVE_AVATAR = "Avatar successfully removed",
  SUCCESS_ADD_TO_CART = "Product added to cart",
  SUCCESS_REMOVE_FROM_CART = "Product removed from cart",
  SUCCESS_REMOVE_ALL_FROM_CART = "All products removed from cart",
  SUCCESS_ORDER = "Your order succesfully placed",
}

export enum ToastTypeNotificationsEnum {
  SUCCESS = "success",
  INFO = "info",
  ERROR = "error",
}

export enum ToastPositionNotificationsEnum {
  BOTTOM_RIGHT = "bottom-right",
  TOP_CENTER = "top-center",
  BOTTOM_CENTER = "bottom-center",
}
