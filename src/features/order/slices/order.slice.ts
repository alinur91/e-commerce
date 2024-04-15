import { createSlice } from "@reduxjs/toolkit";
import { ProductsData } from "@features/products/lib/types";
import { addOrderDetails, fetchOrderById } from "@features/order/api/index";
import { handlePendingState } from "@features/auth/lib/helpers";
import {
  handleOrderFulfilledState,
  handleOrderRejectedState,
} from "@features/order/lib/helpers";
import { DiscountsInfo } from "@features/cart/lib/types";

const orderSlice = createSlice({
  name: "cart",
  initialState: {
    orderedProducts: [] as ProductsData,
    loading: false,
    error: null as string | null,
    name: null,
    phoneNumber: null,
    discountInfo: {} as DiscountsInfo,
    address: null,
    orderSuccess: null,
    orderId: null,
  },
  reducers: {
    setOrderSuccess(state, action) {
      state.orderSuccess = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addOrderDetails.pending, (state) => {
      handlePendingState(state);
    });
    builder.addCase(addOrderDetails.fulfilled, (state, action) => {
      handleOrderFulfilledState(state, action.payload);
    });
    builder.addCase(addOrderDetails.rejected, (state, action) => {
      handleOrderRejectedState(state, action.payload as string);
    });
    builder.addCase(fetchOrderById.pending, (state) => {
      handlePendingState(state);
    });
    builder.addCase(fetchOrderById.fulfilled, (state, action) => {
      handleOrderFulfilledState(state, action.payload);
    });
  },
});

export const { actions, reducer } = orderSlice;
