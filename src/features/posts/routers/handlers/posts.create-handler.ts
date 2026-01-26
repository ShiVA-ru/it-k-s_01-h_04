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
import { blogsService } from "../../../blogs/application/blogs.service";

export async function createPostHandler(
  req: RequestWithBody<PostInput>,
  res: Response<PostView | validationErrorsDto>,
) {
  try {
    const blogEntity = await blogsService.findOneById(req.body.blogId);

    const createdEntity = await postsRepository.create(
      req.body,
      blogEntity.name,
    );

    res.status(HttpStatus.Created).json(mapEntityToViewModel(createdEntity));
  } catch (error) {
    console.log(error);
  }
}
