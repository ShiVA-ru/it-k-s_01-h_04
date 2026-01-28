import { PaginationAndSorting } from "../../../core/types/pagination-and-sorting.type";
import { PostSortFields } from "../validation/posts.query.validation.middleware";

export type PostsQueryInput = PaginationAndSorting;
// export type PostsQueryInput = PaginationAndSorting<PostSortFields>;
