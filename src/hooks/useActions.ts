import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { actions as authActions } from "@features/auth/slices/auth.slice.ts";
import { actions as productsActions } from "@features/products/slices/products.slice";
import { actions as filtersActions } from "@features/filters/slices/filters.slice";
import { actions as cartActions } from "@features/cart/slices/cart.slice";
import { actions as orderActions } from "@features/order/slices/order.slice";

const rootActions = {
  ...authActions,
  ...productsActions,
  ...filtersActions,
  ...cartActions,
  ...orderActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
