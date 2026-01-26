import { Response } from "express";
import { RequestWithBody } from "../../../../core/types/request.types";
import { validationErrorsDto } from "../../../../core/types/errors.types";
import { HttpStatus } from "../../../../core/types/http-statuses.types";
import { mapEntityToViewModel } from "../mappers/posts.entity-map";
import { PostInput } from "../../types/posts.input.type";
import { PostView } from "../../types/posts.view.type";
import { blogsRepository } from "../../../blogs/repositories/blogs.repository";
import { postsRepository } from "../../repositories/posts.repository";
import { createErrorMessages } from "../../../../core/middlewares/input-validation-result.middleware";

export async function createPostHandler(
  req: RequestWithBody<PostInput>,
  res: Response<PostView | validationErrorsDto>,
) {
  const blogEntity = await blogsRepository.findOneById(req.body.blogId);

  if (!blogEntity) {
    res
      .status(HttpStatus.NotFound)
      .json(
        createErrorMessages([{ message: "Blog not found", field: "blogId" }]),
      );
    return;
  }

  const createdEntity = await postsRepository.create(req.body);

  res
    .status(HttpStatus.Created)
    .json(mapEntityToViewModel(createdEntity, blogEntity.name));
}
