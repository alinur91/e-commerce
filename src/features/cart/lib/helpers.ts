import { ToastNotificationsEnum } from "@ts-types/enums";
import { toast } from "react-toastify";
import { CartState } from "@features/cart/lib/types";
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
) => {
  state.loading = false;
};
