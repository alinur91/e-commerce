import {
  ToastNotificationsMessageEnum,
  ToastPositionNotificationsEnum,
  ToastTypeNotificationsEnum,
} from "@ts-types/enums";
import {
  CartState,
  DiscountsInfo,
  ShowNotificationOnAllProductsRemovalEnum,
} from "@features/cart/lib/types";
import { ProductData } from "@features/products/lib/types";
import { showToastNotificationMessage } from "@utils/helpers";

export const handleAddToCartFulfilledState = (
  state: CartState,
  product: ProductData,
) => {
  state.loading = false;
  // if product has been added for the first time to cart,quanitity will be undeinfed,if so then show notification. if product already exists in cart,we're increasing quantity and dont show the notifcation.
  if (!product.quantity) {
    showToastNotificationMessage(
      ToastTypeNotificationsEnum.SUCCESS,
      ToastNotificationsMessageEnum.SUCCESS_ADD_TO_CART,
      ToastPositionNotificationsEnum.TOP_CENTER,
    );
  }
};

export const handleRemoveFromCartFulfilledState = (
  state: CartState,
  currentQuantity: number,
) => {
  state.loading = false;
  state.coupon.loading = false;
  if (currentQuantity <= 0) {
    showToastNotificationMessage(
      ToastTypeNotificationsEnum.SUCCESS,
      ToastNotificationsMessageEnum.SUCCESS_REMOVE_FROM_CART,
      ToastPositionNotificationsEnum.TOP_CENTER,
    );
  }
};

export const handleRemoveAllFromCartFulfilledState = (
  state: CartState,
  shouldShowNotificationOnRemoval: ShowNotificationOnAllProductsRemovalEnum,
) => {
  state.loading = false;
  state.coupon.loading = false;
  if (
    shouldShowNotificationOnRemoval ===
    ShowNotificationOnAllProductsRemovalEnum.YES
  ) {
    showToastNotificationMessage(
      ToastTypeNotificationsEnum.SUCCESS,
      ToastNotificationsMessageEnum.SUCCESS_REMOVE_ALL_FROM_CART,
      ToastPositionNotificationsEnum.TOP_CENTER,
    );
  }
};

export const handleCouponPendingState = (state: CartState) => {
  if (state.coupon) {
    state.coupon.loading = true;
    state.coupon.error = null;
  }
};

export const handleCouponFulfilledState = (
  state: CartState,
  discountInfo: DiscountsInfo,
) => {
  if (state.coupon) {
    state.coupon.loading = false;
    state.coupon.discountInfo = discountInfo;
  }
};

export const handleCouponRejectedState = (
  state: CartState,
  message: string,
) => {
  if (state.coupon) {
    state.coupon.loading = false;
    state.coupon.error = message;
    showToastNotificationMessage(
      ToastTypeNotificationsEnum.ERROR,
      message,
      ToastPositionNotificationsEnum.BOTTOM_RIGHT,
    );
  }
};
