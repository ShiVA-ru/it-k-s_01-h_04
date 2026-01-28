import { Response } from "express";
import { RequestWithParamsAndBody } from "../../../../core/types/request.types";
import { PostInput } from "../../types/posts.input.type";
import { PostView } from "../../types/posts.view.type";
import { validationErrorsDto } from "../../../../core/types/errors.types";
import { HttpStatus } from "../../../../core/types/http-statuses.types";
import { postsRepository } from "../../repositories/posts.repository";
import { createErrorMessages } from "../../../../core/middlewares/validation/input-validation-result.middleware";
import { URIParamsId } from "../../../../core/types/uri-params.type";
import { blogsRepository } from "../../../blogs/repositories/blogs.repository";
import { blogsService } from "../../../blogs/application/blogs.service";
import { postsService } from "../../application/posts.service";

export async function updatePostHandler(
  req: RequestWithParamsAndBody<URIParamsId, PostInput>,
  res: Response<PostView | validationErrorsDto>,
) {
  try {
    await postsService.updateById(req.params.id, req.body);

    res.sendStatus(HttpStatus.NoContent);
  } catch (error) {
    console.log(error);
    res.sendStatus(HttpStatus.NotFound);
  }
}
