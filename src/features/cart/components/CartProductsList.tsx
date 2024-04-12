import { ProductsData } from "@features/products/lib/types";
import { CartProduct } from ".";

type CartProductsProps = {
  cartProducts: ProductsData;
};

const CartProductsList = ({ cartProducts }: CartProductsProps) => {
  return (
    <div className="max-h-[400px] space-y-5 overflow-y-auto p-1">
      {cartProducts.map((cartProduct) => (
        <CartProduct key={cartProduct.productId} cartProduct={cartProduct} />
      ))}
    </div>
  );
};

export default CartProductsList;
