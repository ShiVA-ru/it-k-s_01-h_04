import { PaginationAndSorting } from "../../../core/types/pagination-and-sorting.type";
import { PostSortFields } from "./posts.sort-field.type";

// export type PostsQueryInput = PaginationAndSorting;
export type PostsQueryInput = PaginationAndSorting<PostSortFields>;
