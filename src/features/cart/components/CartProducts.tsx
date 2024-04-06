import { ProductsData } from "@features/products/lib/types";
import { CartProduct } from ".";

type CartProductsProps = {
  cartProducts: ProductsData;
};

const CartProducts = ({ cartProducts }: CartProductsProps) => {
  return (
    <div className="h-[400px] space-y-5 overflow-y-auto p-1">
      {cartProducts.map((cartProduct) => (
        <CartProduct key={cartProduct.productId} cartProduct={cartProduct} />
      ))}
    </div>
  );
};

export default CartProducts;
