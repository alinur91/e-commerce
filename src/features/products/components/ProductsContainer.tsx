import { useAppSelector } from "@hooks/index";
import { selectProductsData } from "@features/products/slices/selector";
import { MoonLoader } from "@utils/icons";
import { ErrorMessage } from "@ui/index";
import { ProductsList } from "@features/products/components/index";
import { ProductsData } from "@features/products/lib/types";

const ProductsContainer = () => {
  const { error, productsList, loading } = useAppSelector(selectProductsData);

  return (
    <div className="px-6 py-4 md:px-24 md:py-10">
      <div className="mb-8 flex justify-between ">
        <h1 className="flex items-center gap-3 text-lg font-bold md:text-2xl">
          Popular Products {loading && <MoonLoader color="#915c0d" size={24} />}{" "}
        </h1>
        {!loading && (
          <p className="flex items-center gap-1 font-semibold text-gray-400">
            Products found:{" "}
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

export default ProductsContainer;
