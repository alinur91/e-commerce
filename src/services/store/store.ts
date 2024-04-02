import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as authReducer } from "@features/auth/slices/auth.slice";
import { reducer as productsReducer } from "@features/products/slices/products.slice";
import { reducer as filtersReducer } from "@features/filters/slices/filters.slice";
import { reducer as cartReducer } from "@features/cart/slices/cartSlice";
import loggerMiddleware from "redux-logger";

const reducers = combineReducers({
  auth: authReducer,
  products: productsReducer,
  filters: filtersReducer,
  cart: cartReducer,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const middleware = (getDefaultMiddleware: any) =>
  getDefaultMiddleware().concat(loggerMiddleware);

export const store = configureStore({
  reducer: reducers,
  middleware,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
