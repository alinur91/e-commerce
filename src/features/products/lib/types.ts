export type ProductData = {
  id: number;
  docID: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: Array<string>;
};

export type ProductsData = ProductData[];

export type ProductsState = {
  productsList: ProductsData | null;
  loading: false;
  error: string | null;
};
