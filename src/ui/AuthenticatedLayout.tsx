import { Outlet, useLocation } from "react-router-dom";
import { CartProductsSidebarContainer, Footer, Header } from "@ui/index";
import { useEffect, useRef, useState } from "react";
import {
  useAppSelector,
  useClickOutside,
  useRemoveCouponEffect,
} from "@hooks/index";
import { useUserDataSubscriptionEffect } from "@hooks/index";
import { MoonLoader } from "@utils/icons";
import { selectAuthData } from "@features/auth/slices/selector";
import { hasCouponApplied, totalAmount } from "@utils/helpers";
import { selectCartData } from "@features/cart/slices/selector";

const AuthenticatedLayout = () => {
  const { loading } = useAppSelector(selectAuthData);
  const {
    cartProducts,
    coupon: { discountInfo },
  } = useAppSelector(selectCartData);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const sidebarContentRef = useRef<HTMLDivElement>(null);
  const totalAmountValue = totalAmount(cartProducts);
  const couponApplied = hasCouponApplied(discountInfo);

  const location = useLocation();
  useUserDataSubscriptionEffect();

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  //close sidebar when clicked outside of header and sidebar content
  useClickOutside({ headerRef, sidebarContentRef }, handleCloseSidebar);

  //if totalAmountValue in cart is less than discount value remove coupon
  useRemoveCouponEffect(couponApplied, discountInfo, totalAmountValue);

  useEffect(() => {
    handleCloseSidebar();
  }, [location]);

  if (loading)
    return (
      <div className="flex h-dvh items-center justify-center">
        <MoonLoader color="#915c0d" />
      </div>
    );

  return (
    <div className="relative">
      <div className="border-l-gray-100 border-r-gray-100 shadow-xl 2xl:container lg:border-l-2 lg:border-r-2 2xl:mx-auto">
        <Header
          headerRef={headerRef}
          handleToggleSidebar={handleToggleSidebar}
        />
        {isSidebarOpen && (
          <CartProductsSidebarContainer
            sidebarContentRef={sidebarContentRef}
            open={isSidebarOpen}
          />
        )}
        <div className="min-h-dvh">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
