import { Response } from "express";
import { RequestWithParams } from "../../../../core/types/request.types";
import { PostView } from "../../types/posts.view.type";
import { HttpStatus } from "../../../../core/types/http-statuses.types";
import { mapEntityToViewModel } from "../mappers/posts.entity-map";
import { validationErrorsDto } from "../../../../core/types/errors.types";
import { URIParamsId } from "../../../../core/types/uri-params.type";
import { postsService } from "../../application/posts.service";

export async function getPostHandler(
  req: RequestWithParams<URIParamsId>,
  res: Response<PostView | validationErrorsDto>,
) {
  try {
    const findEntity = await postsService.findOneById(req.params.id);

    return res.status(HttpStatus.Ok).json(mapEntityToViewModel(findEntity));
  } catch (error) {
    console.log(error);
    res.sendStatus(HttpStatus.NotFound);
  }
}
