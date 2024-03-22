import { useAppDispatch, useAppSelector } from "@hooks/index";
import { useEffect } from "react";
import { selectProductsData } from "@features/products/slices/selector";
import { getProducts } from "@features/products/api/getProducts.api";
import { MoonLoader } from "react-spinners";
import { ErrorMessage } from "@ui/index";
import { ProductsList } from "@features/products/components/index";
import { ProductsData } from "../lib/types";

const Products = () => {
  const dispatch = useAppDispatch();
  const { error, productsList, loading } = useAppSelector(selectProductsData);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="px-6 py-4 md:px-24 md:py-10">
      <div className="mb-8 flex justify-between ">
        <h1 className="flex items-center gap-3 text-lg font-bold md:text-2xl">
          Popular Dishes {loading && <MoonLoader color="#be7c18" size={24} />}{" "}
        </h1>
        {!loading && (
          <p className="flex items-center gap-1 font-semibold text-gray-400">
            Meals found:{" "}
            <span className="text-md font-bold text-green-600 md:text-xl">
              {productsList?.length || 0}
            </span>{" "}
          </p>
        )}
      </div>
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <ProductsList productsList={productsList as ProductsData} />
      )}
    </div>
  );
};

export default Products;
