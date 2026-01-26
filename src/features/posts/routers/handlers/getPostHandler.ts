import { Response } from "express";
import { RequestWithParams } from "../../../../core/types/request-types";
import { URIParamsPostIdModel } from "../../models/URIParamsPostModel";
import { PostViewModel } from "../../models/PostViewModel";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { mapEntityToViewModel } from "../mappers/mapEntityToViewModel";
import { blogsRepository } from "../../../blogs/repositories/blogs.repository";
import { validationErrorsDto } from "../../../../core/types/errors";
import { postsRepository } from "../../repositories/posts.repository";
import { createErrorMessages } from "../../../../core/middlewares/input-validtion-result.middleware";

export async function getPostHandler(
  req: RequestWithParams<URIParamsPostIdModel>,
  res: Response<PostViewModel | validationErrorsDto>,
) {
  console.log("getPostHandler");
  const id = String(req.params.id);
  const findEntity = await postsRepository.findOneById(id);

  if (!findEntity) {
    res.sendStatus(HttpStatus.NotFound);
    return;
  }
  const blogEntity = await blogsRepository.findOneById(findEntity.blogId);

  if (!blogEntity) {
    res
      .status(HttpStatus.NotFound)
      .send(createErrorMessages([{ field: "id", message: "Post not found" }]));
    return;
  }

  return res
    .status(HttpStatus.Ok)
    .json(mapEntityToViewModel(findEntity, blogEntity.name));
}
