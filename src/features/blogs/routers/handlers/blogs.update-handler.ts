import { Response } from "express";
import { RequestWithParamsAndBody } from "../../../../core/types/request.types";
import { URIParamsId } from "../../../../core/types/uri-params.type";
import { BlogInput } from "../../types/blogs.input.type";
import { BlogView } from "../../types/blogs.view.type";
import { validationErrorsDto } from "../../../../core/types/errors.types";
import { HttpStatus } from "../../../../core/types/http-statuses.types";
import { blogsRepository } from "../../repositories/blogs.repository";
import { createErrorMessages } from "../../../../core/middlewares/input-validation-result.middleware";

export async function updateBlogHandler(
  req: RequestWithParamsAndBody<URIParamsId, BlogInput>,
  res: Response<BlogView | validationErrorsDto>,
) {
  const id = String(req.params.id);
  const isUpdated = await blogsRepository.updateById(id, req.body);

  if (!isUpdated) {
    res
      .status(HttpStatus.NotFound)
      .send(createErrorMessages([{ field: "id", message: "Blog not found" }]));
    return;
  }

  res.sendStatus(HttpStatus.NoContent);
}
