import { Outlet, useLocation } from "react-router-dom";
import { CartProductsSidebarContainer, Footer, Header } from "@ui/index";
import { useEffect, useRef, useState } from "react";
import { auth, db } from "@services/firebase/firebaseConfig";
import { useActions, useClickOutside } from "@hooks/index";
import { collection, onSnapshot } from "@firebase/firestore";
import { ProductData, ProductsData } from "@features/products/lib/types";

const AuthenticatedLayout = () => {
  const { setCartProducts: setCartProducts, resetFiltersState } = useActions();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const sidebarContentRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  useClickOutside({ headerRef, sidebarContentRef }, handleCloseSidebar);

  useEffect(() => {
    handleCloseSidebar();
  }, [location]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        resetFiltersState(); // reset filters state on sign out
        //
      }
    });
    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, [resetFiltersState]);

  useEffect(() => {
    // subscribing to cart collection, whenever something changes(remove,add product), it gives the latest data, then write latest data to state.cart.cartProducts
    const unsubscribe = onSnapshot(collection(db, "cart"), (querySnapshot) => {
      const productsData = [] as ProductsData;
      querySnapshot.forEach((doc) => {
        const data = { ...doc.data(), id: doc.id };
        productsData.push(data as ProductData);
      });
      setCartProducts(productsData); //write to state.cart.cartProducts
    });

    return () => {
      // Unsubscribe from real-time updates when the component unmounts
      unsubscribe();
    };
  }, [setCartProducts]);

  return (
    <div className="relative flex min-h-dvh flex-col items-center">
      <div className="w-full flex-1 border-l-gray-100 border-r-gray-100 shadow-xl 2xl:container lg:border-l-2 lg:border-r-2 2xl:mx-auto">
        <div ref={headerRef}>
          <Header handleToggleSidebar={handleToggleSidebar} />
        </div>
        {isSidebarOpen && (
          <CartProductsSidebarContainer
            sidebarContentRef={sidebarContentRef}
            open={isSidebarOpen}
          />
        )}
        <main className="w-full">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AuthenticatedLayout;
