import { Response } from "express";
import { RequestWithParamsAndBody } from "../../../../core/types/request.types";
import { PostInput } from "../../types/posts.input.type";
import { PostView } from "../../types/posts.view.type";
import { validationErrorsDto } from "../../../../core/types/errors.types";
import { HttpStatus } from "../../../../core/types/http-statuses.types";
import { URIParamsId } from "../../../../core/types/uri-params.type";
import { postsService } from "../../application/posts.service";

export async function updatePostHandler(
  req: RequestWithParamsAndBody<URIParamsId, PostInput>,
  res: Response<PostView | validationErrorsDto | { message: string }>,
) {
  try {
    const updateStatus = await postsService.updateById(req.params.id, req.body);

    if (updateStatus.notFound) {
      return res
        .status(HttpStatus.NotFound)
        .send({ message: `${updateStatus.entity} not found` });
    }

    res.sendStatus(HttpStatus.NoContent);
  } catch (error) {
    console.error(error);
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
