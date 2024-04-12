import { RootState } from "@services/store/store";

export const selectOrderData = (state: RootState) => state.orderDetails;
