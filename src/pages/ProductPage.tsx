import { getProductById } from "@features/products/api";
import { selectProductsData } from "@features/products/slices/selector";
import { useAppDispatch, useAppSelector } from "@hooks/index";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { MoonLoader } from "@utils/icons";
import { ErrorMessage } from "@ui/index";
import { ProductOverview } from "@features/products/components";
import { ProductData } from "@features/products/lib/types";

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { loading, error, singleProduct } = useAppSelector(selectProductsData);

  useEffect(() => {
    if (id) dispatch(getProductById(id));
  }, [dispatch, id]);

  return (
    <div className="flex h-dvh items-center justify-center">
      {loading && <MoonLoader color="#be7c18" size={42} />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && singleProduct && (
        <ProductOverview product={singleProduct as ProductData} />
      )}
      <div></div>
    </div>
  );
};

export default ProductPage;
