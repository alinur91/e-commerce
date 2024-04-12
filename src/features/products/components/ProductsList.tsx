import { noData, productsNotFound } from "@data/index";
import { ProductsData } from "@features/products/lib/types";
import { Product } from "@features/products/components/index";
import { PagesEnum,  NoDataResultsMessageEnum } from "@ts-types/enums";
import { NoDataResultsMessage } from "@ui/index";

type ProductsListProps = {
  productsList: ProductsData;
  page?: PagesEnum;
};

const ProductsList = ({
  productsList,
  page = PagesEnum.home,
}: ProductsListProps) => {
  const getContent = (page: PagesEnum, productsList: ProductsData) => {
    if (productsList?.length > 0) {
      return productsList?.map((product) => (
        <Product key={product.productId} product={product} />
      ));
    } else {
      return page === PagesEnum.search ? (
        <NoDataResultsMessage
          imageUrl={noData}
          message={NoDataResultsMessageEnum.NoMatch}
        />
      ) : (
        <img src={productsNotFound} alt="" />
      );
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-8 pb-12">
      {getContent(page, productsList)}
    </div>
  );
};

export default ProductsList;
