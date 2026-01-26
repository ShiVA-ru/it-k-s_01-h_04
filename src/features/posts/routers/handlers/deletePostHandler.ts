import { Response } from "express";
import { RequestWithParams } from "../../../../core/types/request-types";
import { URIParamsPostIdModel } from "../../models/URIParamsPostModel";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { postsRepository } from "../../repositories/posts.repository";
import { createErrorMessages } from "../../../../core/middlewares/input-validtion-result.middleware";

export async function deletePostHandler(
  req: RequestWithParams<URIParamsPostIdModel>,
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
