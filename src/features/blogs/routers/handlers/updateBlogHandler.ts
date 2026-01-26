import { Response } from "express";
import { RequestWithParamsAndBody } from "../../../../core/types/request-types";
import { URIParamsBlogIdModel } from "../../models/URIParamsBlogModel";
import { BlogInputModel } from "../../models/BlogInputModel";
import { BlogViewModel } from "../../models/BlogViewModel";
import { validationErrorsDto } from "../../../../core/types/errors";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { blogsRepository } from "../../repositories/blogs.repository";
import { createErrorMessages } from "../../../../core/middlewares/input-validtion-result.middleware";

export async function updateBlogHandler(
  req: RequestWithParamsAndBody<URIParamsBlogIdModel, BlogInputModel>,
  res: Response<BlogViewModel | validationErrorsDto>,
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
