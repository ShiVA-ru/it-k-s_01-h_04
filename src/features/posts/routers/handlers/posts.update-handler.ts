import { Response } from "express";
import { RequestWithParamsAndBody } from "../../../../core/types/request.types";
import { PostInput } from "../../types/posts.input.type";
import { PostView } from "../../types/posts.view.type";
import { validationErrorsDto } from "../../../../core/types/errors.types";
import { HttpStatus } from "../../../../core/types/http-statuses.types";
import { postsRepository } from "../../repositories/posts.repository";
import { createErrorMessages } from "../../../../core/middlewares/input-validation-result.middleware";
import { URIParamsId } from "../../../../core/types/uri-params.type";

export async function updatePostHandler(
  req: RequestWithParamsAndBody<URIParamsId, PostInput>,
  res: Response<PostView | validationErrorsDto>,
) {
  const id = String(req.params.id);
  const isUpdated = await postsRepository.updateById(id, req.body);

  if (!isUpdated) {
    res
      .status(HttpStatus.NotFound)
      .send(createErrorMessages([{ field: "id", message: "Post not found" }]));
    return;
  }

  res.sendStatus(HttpStatus.NoContent);
}
