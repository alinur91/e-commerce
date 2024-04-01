import { Filters } from "@features/filters/components/index";
import { selectFiltersData } from "@features/filters/slices/selector";
import { getFilteredProducts } from "@features/products/api/index";
import { ProductsContainer } from "@features/products/components";
import { useAppDispatch, useAppSelector } from "@hooks/index";
import ImageBanner from "@ui/ImageBanner";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useAppDispatch();
  const { price, sortBy, rating, category } = useAppSelector(selectFiltersData);

  useEffect(() => {
    dispatch(getFilteredProducts({ price, sortBy, rating, category }));
  }, [dispatch, price, sortBy, rating, category]);

  return (
    <div>
      <div className="border-b-2 border-b-gray-300 shadow-lg">
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
