import { Outlet } from "react-router-dom";
import { Footer, Header } from "@ui/index";
import { useEffect } from "react";
import { auth } from "@services/firebase/firebaseConfig";
import { useActions } from "@hooks/index";

const AuthenticatedLayout = () => {
  const { resetFiltersState } = useActions();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //
      } else {
        resetFiltersState();
      }
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, [resetFiltersState]);

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
