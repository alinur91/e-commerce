import { search } from "@data/index";
import { getProducts } from "@features/products/api/getProducts.api";
import { ProductsList } from "@features/products/components";
import { ProductsData } from "@features/products/lib/types";
import { selectProductsData } from "@features/products/slices/selector";
import { useAppSelector, useAppDispatch } from "@hooks/index";
import { NoSearchResultsMessagesEnum, PagesEnum } from "@ts-types/enums";
import { Button, Input, NoSearchResultsMessage } from "@ui/index";
import { FaHome } from "@utils/icons";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const SearchPage = () => {
  const { productsList } = useAppSelector(selectProductsData);
  const dispatch = useAppDispatch();
  const { register, watch } = useForm({
    defaultValues: {
      searchTerm: "",
    },
  });

  const searchTerm = watch("searchTerm") || "";
  const filteredProducts = productsList?.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase().trim()),
  );

  useEffect(() => {
    if (productsList === null) dispatch(getProducts());
  }, [dispatch, productsList]);

  return (
    <div className="flex flex-col items-center justify-center gap-12 pt-10">
      <Input
        id="searchTerm"
        inputClassName="h-[40px] w-[390px] focus:outline-yellow-700 md:h-[50px] md:w-[500px]"
        autoFocus
        {...register("searchTerm")}
      >
        <Button to="/">
          <FaHome className="absolute right-2 top-1 cursor-pointer  text-3xl text-gray-400 transition-colors duration-200 hover:text-gray-500 md:top-2 md:text-4xl" />
        </Button>
      </Input>
      {searchTerm ? (
        <ProductsList
          page={PagesEnum.search}
          productsList={filteredProducts as ProductsData}
        />
      ) : (
        <NoSearchResultsMessage
          imageUrl={search}
          message={NoSearchResultsMessagesEnum.HelloMessage}
        />
      )}
    </div>
  );
};

export default SearchPage;
