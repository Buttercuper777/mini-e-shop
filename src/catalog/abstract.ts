export type TItemId = number;

export interface ICatalog {
  goods: Array<ICatalogItem>;
  categories: Array<ICategory>;
}

export interface ICatalogItem {
  id: TItemId;
  name: string;
  image: string;
}

export interface ICategory {
  name: string;
  goods: Array<TItemId>;
}

