import { Response } from "express";
import { RequestWithBody } from "../../../../core/types/request.types";
import { validationErrorsDto } from "../../../../core/types/errors.types";
import { HttpStatus } from "../../../../core/types/http-statuses.types";
import { mapEntityToViewModel } from "../mappers/posts.entity-map";
import { PostInput } from "../../types/posts.input.type";
import { PostView } from "../../types/posts.view.type";
import { postsRepository } from "../../repositories/posts.repository";
import { blogsService } from "../../../blogs/application/blogs.service";
import { postsService } from "../../application/posts.service";

export async function createPostHandler(
  req: RequestWithBody<PostInput>,
  res: Response<PostView | validationErrorsDto>,
) {
  try {
    const insertedId = await postsService.create(req.body);
    const createdEntity = await postsService.findOneById(insertedId);

    res.status(HttpStatus.Created).json(mapEntityToViewModel(createdEntity));
  } catch (error) {
    console.log(error);
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
