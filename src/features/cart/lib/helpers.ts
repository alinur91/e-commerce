import { ToastNotificationsEnum } from "@ts-types/enums";
import { toast } from "react-toastify";
import { CartState } from "@features/cart/lib/types";

export const handleAddToCartFulfilledState = (
  state: CartState,
  productId: string,
) => {
  state.loading = false;
  if (productId) {
    toast.success(ToastNotificationsEnum.SUCCESS_ADD_TO_CART, {
      position: "top-center",
      autoClose: 1000,
    });
  }
};

export const handleRemoveFromCartFulfilledState = (
  state: CartState,
  productId: string,
) => {
  state.loading = false;
  if (productId) {
    state.cartProducts = state.cartProducts.filter(
      (cartProduct) => cartProduct.productId !== productId,
    );
    toast.success(ToastNotificationsEnum.SUCCESS_REMOVE_FROM_CART, {
      position: "top-center",
      autoClose: 1000,
    });
  }
};
