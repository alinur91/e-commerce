export enum CategoryEnum {
  "beauty" = "Beauty",
  "fragrances" = "Fragrances",
  "furniture" = "Furniture",
  "groceries" = "Groceries",
  "all" = "All",
}

export enum PriceByAscDescEnum {
  "ASC" = "By Price | 0-9",
  "DESC" = "By Price | 9-0",
}

export type FiltersState = {
  category: CategoryEnum;
  rating: number;
  price: number;
  sortBy: PriceByAscDescEnum;
  error: null;
};

export enum FiltersKeyEnum {
  "CATEGORY" = "category",
  "RATING" = "rating",
  "PRICE" = "price",
  "SORTBY" = "sortBy",
}
