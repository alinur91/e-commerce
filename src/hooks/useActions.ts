import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { actions as authActions } from "@features/auth/slices/auth.slice.ts";
import { actions as productsActions } from "@features/products/slices/products.slice";

const rootActions = {
  ...authActions,
  ...productsActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
