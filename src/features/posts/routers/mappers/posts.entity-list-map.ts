import { WithId } from "mongodb";
import { PostDb } from "../../types/posts.db.type";
import { mapEntityToViewModel } from "./posts.entity-map";
import { Paginator } from "../../../../core/types/paginator.type";
import { PostView } from "../../types/posts.view.type";

export const mapPostsToPaginatedView = (
  dbEntities: WithId<PostDb>[],
  meta: {
    page: number;
    pageSize: number;
    totalCount: number;
  },
): Paginator<PostView> => {
  const pagesCount = Math.ceil(meta.totalCount / meta.pageSize);

  const mappedPosts = dbEntities.map(mapEntityToViewModel);

  return {
    items: mappedPosts,
    pagesCount,
    page: meta.page,
    pageSize: meta.pageSize,
    totalCount: meta.totalCount,
  };
};
