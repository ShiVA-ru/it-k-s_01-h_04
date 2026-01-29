import { query } from "express-validator";
import { SortDirection } from "../../../core/types/sort-direction.type";
import { BlogSortFields } from "../types/blogs.sort-field.type";

const DEFAULT_SEARCH_TERM = null;
const DEFAULT_SORT_BY = BlogSortFields.CREATED_AT;
const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;

const sortDirectionValues = Object.values(SortDirection);
const allowedSortFields = Object.values(BlogSortFields);

const searchNameTermValidation = query("searchNameTerm")
  .trim()
  .isString()
  .withMessage("Search name term must be a string")
  .customSanitizer((value) => {
    return value === "" ? DEFAULT_SEARCH_TERM : value;
  });

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
  .default(DEFAULT_SORT_BY) // Первое значение enum как дефолтное
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

export const paginationSortingSearchValidation = [
  searchNameTermValidation,
  pageNumberValidation,
  pageSizeValidation,
  sortByValidation,
  sortDirectionValidation,
];
