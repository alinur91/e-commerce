import { noData } from "@data/index";
import { ProductsData } from "@features/products/lib/types";
import { Product } from "@features/products/components/index";
import { productsNotFound } from "@data/index";
import { PagesEnum, NoResultsMessagesEnum } from "@ts-types/enums";
import { NoResultsMessage } from "@ui/index";

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
        <Product key={product.id} product={product} />
      ));
    } else {
      return page === PagesEnum.home ? (
        <img src={productsNotFound} alt="" />
      ) : (
        <NoResultsMessage
          imageUrl={noData}
          message={NoResultsMessagesEnum.NoMatch}
        />
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
