import { Response } from "express";
import { RequestWithParams } from "../../../../core/types/request.types";
import { PostView } from "../../types/posts.view.type";
import { HttpStatus } from "../../../../core/types/http-statuses.types";
import { mapEntityToViewModel } from "../mappers/posts.entity-map";
import { blogsRepository } from "../../../blogs/repositories/blogs.repository";
import { validationErrorsDto } from "../../../../core/types/errors.types";
import { postsRepository } from "../../repositories/posts.repository";
import { createErrorMessages } from "../../../../core/middlewares/input-validation-result.middleware";
import { URIParamsId } from "../../../../core/types/uri-params.type";

export async function getPostHandler(
  req: RequestWithParams<URIParamsId>,
  res: Response<PostView | validationErrorsDto>,
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
