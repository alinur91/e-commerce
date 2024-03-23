import { Outlet } from "react-router-dom";
import { Footer, Header } from "@ui/index";
import { useEffect } from "react";
import { getProducts } from "@features/products/api/getProducts.api";
import { useAppDispatch, useAppSelector } from "@hooks/index";
import { selectAuthData } from "@features/auth/slices/selector";
import { toast } from "react-toastify";
import { getLocalStorageItem, setLocalStorageItem } from "@utils/helpers";
import { LocalStorageKeyEnum, ToastNotificationsEnum } from "@ts-types/enums";

const AuthenticatedLayout = () => {
  const dispatch = useAppDispatch();
  const { loggedInUser } = useAppSelector(selectAuthData);
  const hasShownToast = getLocalStorageItem<boolean>(
    LocalStorageKeyEnum.LOGGED_IN_TOAST_SHOWN,
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (loggedInUser && !hasShownToast) {
      toast.success(ToastNotificationsEnum.SUCCESS_SIGN_IN, {
        position: "bottom-right",
        toastId: "success1",
      });
      setLocalStorageItem(LocalStorageKeyEnum.LOGGED_IN_TOAST_SHOWN, true);
    }
  }, [hasShownToast, loggedInUser]);

  return (
    <div className="flex min-h-dvh flex-col items-center">
      <div className="container mx-auto flex-1 border-l-gray-100 border-r-gray-100 shadow-xl lg:border-l-2 lg:border-r-2">
        <Header />
        <main className="w-full">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AuthenticatedLayout;
