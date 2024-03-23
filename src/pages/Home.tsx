import { Filters } from "@features/filters/components/index";
import { ProductsContainer } from "@features/products/components";
import ImageBanner from "@ui/ImageBanner";

const Home = () => {
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
