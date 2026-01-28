import { Response } from "express";
import { RequestWithParams } from "../../../../core/types/request.types";
import { HttpStatus } from "../../../../core/types/http-statuses.types";
import { URIParamsId } from "../../../../core/types/uri-params.type";
import { postsService } from "../../application/posts.service";

export async function deletePostHandler(
  req: RequestWithParams<URIParamsId>,
  res: Response,
) {
  try {
    await postsService.deleteById(req.params.id);

    return res.sendStatus(HttpStatus.NoContent);
  } catch (error) {
    console.log(error);
    res.sendStatus(HttpStatus.NotFound);
  }
}
