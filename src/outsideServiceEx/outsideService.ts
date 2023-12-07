export interface IOutsideCategory {
  name: string;
  goods: OutsideService;
}

export interface IOutsideCatalogItem {
  id: number;
  name: string;
  image: string;
}

export class OutsideService {
  constructor(private data: Array<number>) {}

  getItems(
    offset: number,
    limit: number,
    getItemById: (itemId: number) => IOutsideCatalogItem,
    filterByName: boolean = false
  ): IOutsideCatalogItem[] {
    const dataForGetting = filterByName
      ? this.filterItemsByName(getItemById)
      : this.data.map(getItemById);

    const startIndex = offset;
    const endIndex = startIndex + limit;
    const paginatedData = dataForGetting.slice(startIndex, endIndex);

    return paginatedData;
  }

  private filterItemsByName(
    getItemById: (itemId: number) => IOutsideCatalogItem
  ): IOutsideCatalogItem[] {
    const itemIds = this.data;
    const catalogItems = itemIds.map(getItemById);
    catalogItems.sort((a, b) => a.name.localeCompare(b.name));
    return catalogItems;
  }
}
