import { ProductsData, ProductsState } from "@features/products/lib/types";

export const handleProductsFulfilledState = (
  state: ProductsState,
  productsList: ProductsData,
) => {
  state.loading = false;
  state.productsList = productsList;
};
