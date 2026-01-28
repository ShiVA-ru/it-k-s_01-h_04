import { Request, Response } from "express";
import { HttpStatus } from "../../../../core/types/http-statuses.types";
import { PostView } from "../../types/posts.view.type";
import { matchedData } from "express-validator";
import { postsService } from "../../application/posts.service";
import { PostsQueryInput } from "../../types/posts.query.type";
import { mapPostsToPaginatedView } from "../mappers/posts.entity-list-map";
import { Paginator } from "../../../../core/types/paginator.type";

export async function getPostListHandler(
  req: Request,
  res: Response<Paginator<PostView>>,
) {
  try {
    const queryData = matchedData<PostsQueryInput>(req, {
      locations: ["query"],
    });
    console.log("queryData", queryData);

    const { items, totalCount } = await postsService.findAll(queryData);

    const postsListOutput = mapPostsToPaginatedView(items, {
      pageSize: queryData.pageSize,
      page: queryData.pageNumber,
      totalCount,
    });
    res.status(HttpStatus.Ok).json(postsListOutput);
  } catch (error) {
    console.log(error);
    res.sendStatus(HttpStatus.InternalServerError);
  }
}

//! Обработка отсутствующих данных через null
