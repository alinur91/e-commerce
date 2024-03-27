import { Filters } from "@features/filters/components/index";
import { getProducts } from "@features/products/api/index";
import { ProductsContainer } from "@features/products/components";
import { useAppDispatch } from "@hooks/index";
import ImageBanner from "@ui/ImageBanner";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

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
