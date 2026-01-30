import { Request, Response } from "express";
import { HttpStatus } from "../../../../core/types/http-statuses.types";
import { matchedData } from "express-validator";
import { Paginator } from "../../../../core/types/paginator.type";
import { PostsQueryInput } from "../../../posts/types/posts.query.type";
import { postsService } from "../../../posts/application/posts.service";
import { mapPostsToPaginatedView } from "../../../posts/routers/mappers/posts.entity-list-map";
import { PostView } from "../../../posts/types/posts.view.type";

export async function getBlogPostsListHandler(
  req: Request,
  res: Response<Paginator<PostView>>,
) {
  try {
    const blogId = req.params.id.toString();
    const queryData = matchedData<PostsQueryInput>(req, {
      locations: ["query"],
    });

    const postsList = await postsService.findPostByBlogId(blogId, queryData);

    if (!postsList) {
      return res.sendStatus(HttpStatus.NotFound);
    }

    const { items, totalCount } = postsList;

    const postsListOutput = mapPostsToPaginatedView(items, {
      pageSize: queryData.pageSize,
      page: queryData.pageNumber,
      totalCount,
    });
    res.status(HttpStatus.Ok).json(postsListOutput);
  } catch (error) {
    console.error(error);
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
