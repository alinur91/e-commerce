import { selectAuthData } from "@features/auth/slices/selector";
import Filters from "@features/filters/components/Filters";
import { ProductsContainer } from "@features/products/components";
import { useAppSelector } from "@hooks/useAppSelector";
import useLocalStorage from "@hooks/useLocalStorage";
import ImageBanner from "@ui/ImageBanner";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Home = () => {
  const { loggedInUser } = useAppSelector(selectAuthData);
  const [hasShownToast, setHasShownToast] = useLocalStorage<boolean>(
    "loggedInToastShown",
    false,
  );

  useEffect(() => {
    if (loggedInUser && !hasShownToast) {
      toast.success("Successfully signed in", {
        position: "bottom-right",
        toastId: "success1",
      });
      setHasShownToast(true);
    }
  }, [hasShownToast, loggedInUser, setHasShownToast]);

  return (
    <div>
      <div className="border-b-2 border-b-gray-300 shadow-sm">
        <ImageBanner />
        <Filters />
      </div>
      <main>
        <ProductsContainer />
      </main>
    </div>
  );
};

export default Home;
