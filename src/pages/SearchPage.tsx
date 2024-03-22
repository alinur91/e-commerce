import { selectProductsData } from "@features/products/slices/selector";
import { useAppSelector } from "@hooks/useAppSelector";
import Button from "@ui/Button";
import Input from "@ui/Input";
import { FaHome } from "@utils/icons";

const SearchPage = () => {
  const { productsList } = useAppSelector(selectProductsData);

  return (
    <div className="flex items-center justify-center pt-10">
      <Input className="h-[40px] w-[450px] md:h-[50px]">
        <Button to="/">
          <FaHome className="absolute right-2 top-1 cursor-pointer  text-3xl text-gray-400 md:top-2 md:text-4xl" />
        </Button>
      </Input>
    </div>
  );
};

export default SearchPage;
