import { ToastNotificationsEnum } from "@ts-types/enums";
import { toast } from "react-toastify";
import { CartState, DiscountsInfo } from "@features/cart/lib/types";
import { ProductData } from "@features/products/lib/types";

export const handleAddToCartFulfilledState = (
  state: CartState,
  product: ProductData,
) => {
  state.loading = false;
  // if product has been added for the first time to cart,quanitity will be undeinfed,if so then show notification. if product already exists in cart,we're increasing quantity and dont show the notifcation.
  if (!product.quantity) {
    toast.success(ToastNotificationsEnum.SUCCESS_ADD_TO_CART, {
      position: "top-center",
      autoClose: 1000,
    });
  }
};

export const handleRemoveFromCartFulfilledState = (
  state: CartState,
  currentQuantity: number,
) => {
  state.loading = false;
  state.coupon.loading = false;
  if (currentQuantity <= 0) {
    toast.success(ToastNotificationsEnum.SUCCESS_REMOVE_FROM_CART, {
      position: "top-center",
      autoClose: 1000,
    });
  }
};

export const handleRemoveAllFromCartFulfilledState = (
  state: CartState,
  isSuccessRemoval: boolean,
) => {
  state.loading = false;
  state.coupon.loading = false;
  if (isSuccessRemoval) {
    toast.success(ToastNotificationsEnum.SUCCESS_REMOVE_ALL_FROM_CART, {
      position: "top-center",
      autoClose: 1000,
    });
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
    toast.error(message, { position: "bottom-right", autoClose: 1000 });
  }
};
