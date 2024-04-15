import { createSlice } from "@reduxjs/toolkit";
import {
  addProductToCart,
  removeProductFromCart,
  setCoupon,
  removeCoupon,
  removeAllProductsAndCoupon,
} from "@features/cart/api/index";
import { ProductData, ProductsData } from "@features/products/lib/types";
import {
  handlePendingState,
  handleRejectedState,
} from "@features/auth/lib/helpers";
import {
  handleAddToCartFulfilledState,
  handleCouponPendingState,
  handleRemoveFromCartFulfilledState,
  handleCouponRejectedState,
  handleRemoveAllFromCartFulfilledState,
} from "@features/cart/lib/helpers";
import { type Coupon } from "@features/cart/lib/types";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartProducts: [] as ProductsData,
    loading: false,
    error: null as string | null,
    coupon: { error: null, discountInfo: {}, loading: false } as Coupon,
  },
  reducers: {
    setCartLoading(state, action) {
      state.loading = action.payload;
    },
    setCartProducts(state, action) {
      state.cartProducts = action.payload;
    },
    setCouponData(state, action) {
      state.coupon.discountInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addProductToCart.pending, (state) => {
      handlePendingState(state);
    });
    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      handleAddToCartFulfilledState(state, action.payload as ProductData);
    });
    builder.addCase(addProductToCart.rejected, (state, action) => {
      handleRejectedState(state, action.payload as string);
    });
    builder.addCase(removeProductFromCart.pending, (state) => {
      handlePendingState(state);
    });
    builder.addCase(removeProductFromCart.fulfilled, (state, action) => {
      handleRemoveFromCartFulfilledState(state, action.payload);
    });
    builder.addCase(removeProductFromCart.rejected, (state, action) => {
      handleRejectedState(state, action.payload as string);
    });
    builder.addCase(setCoupon.pending, (state) => {
      handleCouponPendingState(state);
    });
    builder.addCase(setCoupon.rejected, (state, action) => {
      handleCouponRejectedState(state, action.payload as string);
    });
    builder.addCase(removeCoupon.pending, (state) => {
      handleCouponPendingState(state);
    });
    builder.addCase(removeCoupon.rejected, (state, action) => {
      handleCouponRejectedState(state, action.payload as string);
    });
    builder.addCase(removeAllProductsAndCoupon.pending, (state) => {
      handlePendingState(state);
    });
    builder.addCase(removeAllProductsAndCoupon.fulfilled, (state, action) => {
      handleRemoveAllFromCartFulfilledState(state, action.payload);
    });
    builder.addCase(removeAllProductsAndCoupon.rejected, (state, action) => {
      handleRejectedState(state, action.payload as string);
    });
  },
});

export const { actions, reducer } = cartSlice;
