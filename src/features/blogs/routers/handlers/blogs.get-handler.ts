import { Response } from "express";
import { RequestWithParams } from "../../../../core/types/request.types";
import { URIParamsId } from "../../../../core/types/uri-params.type";
import { BlogView } from "../../types/blogs.view.type";
import { HttpStatus } from "../../../../core/types/http-statuses.types";
import { mapEntityToViewModel } from "../mappers/blogs.entity-map";
import { blogsRepository } from "../../repositories/blogs.repository";
import { validationErrorsDto } from "../../../../core/types/errors.types";
import { createErrorMessages } from "../../../../core/middlewares/input-validation-result.middleware";

export async function getBlogHandler(
  req: RequestWithParams<URIParamsId>,
  res: Response<BlogView | validationErrorsDto>,
) {
  const id = String(req.params.id);
  const findEntity = await blogsRepository.findOneById(id);

  if (!findEntity) {
    res
      .status(HttpStatus.NotFound)
      .send(createErrorMessages([{ field: "id", message: "Blog not found" }]));
    return;
  }

  return res.status(HttpStatus.Ok).json(mapEntityToViewModel(findEntity));
}
