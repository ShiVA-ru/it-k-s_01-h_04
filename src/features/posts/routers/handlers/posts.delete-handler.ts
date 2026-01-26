import { Response } from "express";
import { RequestWithParams } from "../../../../core/types/request.types";
import { HttpStatus } from "../../../../core/types/http-statuses.types";
import { postsRepository } from "../../repositories/posts.repository";
import { createErrorMessages } from "../../../../core/middlewares/input-validation-result.middleware";
import { URIParamsId } from "../../../../core/types/uri-params.type";

export async function deletePostHandler(
  req: RequestWithParams<URIParamsId>,
  res: Response,
) {
  const id = String(req.params.id);
  const post = await postsRepository.findOneById(id);

  if (!post) {
    res
      .status(HttpStatus.NotFound)
      .send(createErrorMessages([{ field: "id", message: "Post not found" }]));
    return;
  }

  await postsRepository.deleteById(id);

  return res.sendStatus(HttpStatus.NoContent);
}
