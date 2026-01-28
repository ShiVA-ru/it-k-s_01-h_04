import { SortDirection } from "./sort-direction.type";

export type PaginationAndSorting = {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  sortDirection: SortDirection;
};
