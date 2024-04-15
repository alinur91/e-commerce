import {
  ToastNotificationsMessageEnum,
  ToastPositionNotificationsEnum,
  ToastTypeNotificationsEnum,
} from "@ts-types/enums";
import { OrderDetails, OrderState } from "@features/order/lib/types";
import { showToastNotificationMessage } from "@utils/helpers";

export const handleOrderFulfilledState = (
  state: OrderState,
  {
    address,
    phoneNumber,
    name,
    orderedProducts,
    orderSuccess,
    orderId,
    discountInfo,
  }: OrderDetails,
) => {
  state.loading = false;
  state.address = address;
  state.phoneNumber = phoneNumber;
  state.discountInfo = discountInfo;
  state.name = name;
  state.orderSuccess = orderSuccess;
  state.orderId = orderId;
  state.orderedProducts = orderedProducts;
  if (orderSuccess)
    showToastNotificationMessage(
      ToastTypeNotificationsEnum.SUCCESS,
      ToastNotificationsMessageEnum.SUCCESS_ORDER,
      ToastPositionNotificationsEnum.TOP_CENTER,
    );
};

export const handleOrderRejectedState = (
  state: OrderState,
  message: string,
) => {
  state.loading = false;
  state.orderSuccess = false;
  state.error = message;
  showToastNotificationMessage(
    ToastTypeNotificationsEnum.ERROR,
    message,
    ToastPositionNotificationsEnum.BOTTOM_RIGHT,
  );
};
