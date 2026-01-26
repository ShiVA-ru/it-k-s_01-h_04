import { Response } from "express";
import { RequestWithParamsAndBody } from "../../../../core/types/request-types";
import { URIParamsPostIdModel } from "../../models/URIParamsPostModel";
import { PostInputModel } from "../../models/PostInputModel";
import { PostViewModel } from "../../models/PostViewModel";
import { validationErrorsDto } from "../../../../core/types/errors";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { postsRepository } from "../../repositories/posts.repository";
import { createErrorMessages } from "../../../../core/middlewares/input-validtion-result.middleware";

export async function updatePostHandler(
  req: RequestWithParamsAndBody<URIParamsPostIdModel, PostInputModel>,
  res: Response<PostViewModel | validationErrorsDto>,
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
