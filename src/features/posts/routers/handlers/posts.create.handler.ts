import { Response } from "express";
import { RequestWithBody } from "../../../../core/types/request.types";
import { validationErrorsDto } from "../../../../core/types/errors.types";
import { HttpStatus } from "../../../../core/types/http-statuses.types";
import { mapEntityToViewModel } from "../mappers/posts.entity-map";
import { PostInput } from "../../types/posts.input.type";
import { PostView } from "../../types/posts.view.type";
import { postsService } from "../../application/posts.service";

export async function createPostHandler(
  req: RequestWithBody<PostInput>,
  res: Response<PostView | validationErrorsDto>,
) {
  try {
    const insertedId = await postsService.create(req.body);

    if (!insertedId) {
      return res.sendStatus(HttpStatus.NotFound);
    }

    const createdEntity = await postsService.findOneById(insertedId);

    if (!createdEntity) {
      return res.sendStatus(HttpStatus.NotFound);
    }

    res.status(HttpStatus.Created).json(mapEntityToViewModel(createdEntity));
  } catch (error) {
    console.error(error);
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
