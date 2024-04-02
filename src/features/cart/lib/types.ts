import { ProductsData } from "@features/products/lib/types";

export type CartState = {
  cartProducts: ProductsData | [];
  loading: boolean;
  error: string | null;
};
