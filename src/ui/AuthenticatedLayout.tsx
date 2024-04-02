import { Outlet } from "react-router-dom";
import { Footer, Header } from "@ui/index";
import { useEffect } from "react";
import { auth, db } from "@services/firebase/firebaseConfig";
import { useActions } from "@hooks/index";
import { collection, onSnapshot } from "@firebase/firestore";
import { ProductData, ProductsData } from "@features/products/lib/types";

const AuthenticatedLayout = () => {
  const { updateCartProducts } = useActions();

  const { resetFiltersState } = useActions();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //
      } else {
        resetFiltersState(); // reset filters state on sign out
      }
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, [resetFiltersState]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "cart"), (querySnapshot) => {
      const productsData = [] as ProductsData;
      querySnapshot.forEach((doc) => {
        const data = { ...doc.data(), id: doc.id };
        productsData.push(data as ProductData);
      });
      updateCartProducts(productsData);
    });

    return () => {
      // Unsubscribe from real-time updates when the component unmounts
      unsubscribe();
    };
  }, [updateCartProducts]);

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
