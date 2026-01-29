import { Request, Response } from "express";
import { HttpStatus } from "../../../../core/types/http-statuses.types";
import { mapEntityToViewModel } from "../mappers/blogs.entity-map";
import { BlogView } from "../../types/blogs.view.type";
import { blogsService } from "../../application/blogs.service";
import { matchedData } from "express-validator";
import { BlogsQueryInput } from "../../types/blogs.query.type";
import { mapBlogsToPaginatedView } from "../mappers/blogs.entity-list-map";
import { Paginator } from "../../../../core/types/paginator.type";

export async function getBlogListHandler(
  req: Request,
  res: Response<Paginator<BlogView>>,
) {
  try {
    const queryData = matchedData<BlogsQueryInput>(req, {
      locations: ["query"],
    });

    const { items, totalCount } = await blogsService.findAll(queryData);

    const blogsListOutput = mapBlogsToPaginatedView(items, {
      pageSize: queryData.pageSize,
      page: queryData.pageNumber,
      totalCount,
    });
    res.status(HttpStatus.Ok).json(blogsListOutput);
  } catch (error) {
    console.log(error);
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
