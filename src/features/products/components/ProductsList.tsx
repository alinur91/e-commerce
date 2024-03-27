import { noData, productsNotFound } from "@data/index";
import { ProductsData } from "@features/products/lib/types";
import { Product } from "@features/products/components/index";
import { PagesEnum, NoSearchResultsMessagesEnum } from "@ts-types/enums";
import { NoSearchResultsMessage } from "@ui/index";

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
        <NoSearchResultsMessage
          imageUrl={noData}
          message={NoSearchResultsMessagesEnum.NoMatch}
        />
      ) : (
        <img src={productsNotFound} alt="" />
      );
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-8">
      {getContent(page, productsList)}
    </div>
  );
};

export default ProductsList;
