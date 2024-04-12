import { RootState } from "@services/store/store";

export const selectCartData = (state: RootState) => state.cart;
