import { Response } from "express";
import { RequestWithBody } from "../../../../core/types/request.types";
import { BlogInput } from "../../types/blogs.input.type";
import { HttpStatus } from "../../../../core/types/http-statuses.types";
import { BlogView } from "../../types/blogs.view.type";
import { mapEntityToViewModel } from "../mappers/blogs.entity-map";
import { validationErrorType } from "../../../../core/types/errors.types";
import { blogsService } from "../../application/blogs.service";

export async function createBlogHandler(
  req: RequestWithBody<BlogInput>,
  res: Response<BlogView | validationErrorType>,
) {
  try {
    const insertedId = await blogsService.create(req.body);

    const createdEntity = await blogsService.findOneById(insertedId);

    if (!createdEntity) {
      return res.sendStatus(HttpStatus.NotFound);
    }

    res.status(HttpStatus.Created).json(mapEntityToViewModel(createdEntity));
  } catch (error) {
    console.error(error);
    res.sendStatus(HttpStatus.InternalServerError);
    // res.status(HttpStatus.InternalServerError).json(
    //   createErrorMessages({
    //     field: "message",
    //     message: "Internal Server Error",
    //   }),
    // );
  }
}
