import { Response } from "express";
import { RequestWithParams } from "../../../../core/types/request-types";
import { URIParamsBlogIdModel } from "../../models/URIParamsBlogModel";
import { BlogViewModel } from "../../models/BlogViewModel";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { mapEntityToViewModel } from "../mappers/mapEntityToViewModel";
import { blogsRepository } from "../../repositories/blogs.repository";
import { validationErrorsDto } from "../../../../core/types/errors";
import { createErrorMessages } from "../../../../core/middlewares/input-validtion-result.middleware";

export async function getBlogHandler(
  req: RequestWithParams<URIParamsBlogIdModel>,
  res: Response<BlogViewModel | validationErrorsDto>,
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
