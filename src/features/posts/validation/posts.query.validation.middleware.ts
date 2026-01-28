import { query } from "express-validator";
import { PaginationAndSorting } from "../../../core/types/pagination-and-sorting.type";
import { SortDirection } from "../../../core/types/sort-direction.type";

const DEFAULT_SORT_BY = "createdAt";
const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;

export enum PostSortFields {
  CREATED_AT = "createdAt",
  TITLE = "title",
  BLOG_NAME = "blogName",
}

const sortDirectionValues = Object.values(SortDirection);

const allowedSortFields = Object.values(PostSortFields);

export const paginationAndSortingDefault: PaginationAndSorting = {
  pageNumber: DEFAULT_PAGE_NUMBER,
  pageSize: DEFAULT_PAGE_SIZE,
  sortBy: DEFAULT_SORT_BY,
  sortDirection: DEFAULT_SORT_DIRECTION,
};

const pageNumberValidation = query("pageNumber")
  .default(DEFAULT_PAGE_NUMBER)
  .isInt({ min: 1 })
  .withMessage("Page number must be a positive integer")
  .toInt();

const pageSizeValidation = query("pageSize")
  .default(DEFAULT_PAGE_SIZE)
  .isInt({ min: 1, max: 100 })
  .withMessage("Page size must be between 1 and 100")
  .toInt();

const sortByValidation = query("sortBy")
  .default(allowedSortFields[0]) // Первое значение enum как дефолтное
  .isIn(allowedSortFields)
  .withMessage(
    `Invalid sort field. Allowed values: ${allowedSortFields.join(", ")}`,
  );

const sortDirectionValidation = query("sortDirection")
  .default(DEFAULT_SORT_DIRECTION)
  .isIn(sortDirectionValues)
  .withMessage(
    `Sort direction must be one of: ${sortDirectionValues.join(", ")}`,
  );

export const paginationAndSortingValidation = [
  pageNumberValidation,
  pageSizeValidation,
  sortByValidation,
  sortDirectionValidation,
];
