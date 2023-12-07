import { useState } from "react";
import { fullProductList } from "./fullProductList";
import {
  IOutsideCatalogItem,
  IOutsideCategory,
  OutsideService,
} from "./outsideService";

export const useGetOutside = () => {
  const [error, setError] = useState<boolean>(false);

  interface IOutsideCatalog {
    food: IOutsideCategory;
    clothes: IOutsideCategory;
    electronics: IOutsideCategory;
  }

  const initialState = {
    food: {
      name: "food",
      goods: new OutsideService([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      ]),
    },
    clothes: {
      name: "clothes",
      goods: new OutsideService([
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
        39, 40,
      ]),
    },
    electronics: {
      name: "electronics",
      goods: new OutsideService([
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58,
        59, 60,
      ]),
    },
  } as IOutsideCatalog;

  const getOutsideData = (
    category: keyof IOutsideCatalog,
    offset: number,
    limit: number,
    filterByName: boolean = false
  ): Array<IOutsideCatalogItem> => {
    return initialState[category].goods.getItems(
      offset,
      limit,
      (id) => {
        const res = fullProductList.find((el) => el.id === id);
        if (!res) {
          setError(true);
          return {} as IOutsideCatalogItem;
        } else {
          setError(false);
          return res;
        }
      },
      filterByName
    );
  };

  const getDataByKey = (key: number): IOutsideCatalogItem | undefined => {
    return fullProductList.find((el) => el.id === key);
  };

  return {
    error,
    getOutsideData,
    getDataByKey,
  };
};
