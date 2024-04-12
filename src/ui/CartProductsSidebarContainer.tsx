import { useAppSelector } from "@hooks/index";
import { CartProductsSidebar, NoDataResultsMessage } from ".";
import { selectCartData } from "@features/cart/slices/selector";
import { CartProductsContent } from "@features/cart/components";
import { RefObject } from "react";
import { cartEmpty } from "@data/index";
import { MoonLoader } from "@utils/icons";

type CartProductsSidebarContainerProps = {
  open: boolean;
  sidebarContentRef: RefObject<HTMLElement>;
};

const CartProductsSidebarContainer = ({
  open,
  sidebarContentRef,
}: CartProductsSidebarContainerProps) => {
  const { cartProducts, loading } = useAppSelector(selectCartData);
  
  return (
    <CartProductsSidebar sidebarContentRef={sidebarContentRef} open={open}>
      <h1 className="mb-8 flex items-center justify-between text-xl font-bold opacity-80 md:text-2xl">
        My Orders {loading && <MoonLoader size={24} color="#915c0d" />}
      </h1>
      {cartProducts.length > 0 && <CartProductsContent />}
      {!loading && cartProducts.length <= 0 && (
        <NoDataResultsMessage imageUrl={cartEmpty} />
      )}
    </CartProductsSidebar>
  );
};

export default CartProductsSidebarContainer;
