import { Response } from "express";
import { RequestWithBody } from "../../../../core/types/request-types";
import { validationErrorsDto } from "../../../../core/types/errors";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { mapEntityToViewModel } from "../mappers/mapEntityToViewModel";
import { PostInputModel } from "../../models/PostInputModel";
import { PostViewModel } from "../../models/PostViewModel";
import { blogsRepository } from "../../../blogs/repositories/blogs.repository";
import { postsRepository } from "../../repositories/posts.repository";
import { createErrorMessages } from "../../../../core/middlewares/input-validtion-result.middleware";

export async function createPostHandler(
  req: RequestWithBody<PostInputModel>,
  res: Response<PostViewModel | validationErrorsDto>,
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
