import { RootState } from "@services/store/store";

export const selectCartData = (state: RootState) => state.cart;
// export const selectProductInCart = (state: RootState) => (productId: string) =>
//   state.cart.cartProducts.find(
//     (cartProduct) => cartProduct.productId === productId,
//   );
