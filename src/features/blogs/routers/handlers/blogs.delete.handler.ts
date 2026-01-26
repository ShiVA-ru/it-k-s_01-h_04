import { Response } from "express";
import { RequestWithParams } from "../../../../core/types/request.types";
import { URIParamsId } from "../../../../core/types/uri-params.type";
import { HttpStatus } from "../../../../core/types/http-statuses.types";
import { blogsRepository } from "../../repositories/blogs.repository";
import { createErrorMessages } from "../../../../core/middlewares/input-validation-result.middleware";
import { blogsService } from "../../application/blogs.service";

export async function deleteBlogHandler(
  req: RequestWithParams<URIParamsId>,
  res: Response,
) {
  try {
    await blogsService.deleteById(req.params.id);

    return res.sendStatus(HttpStatus.NoContent);
  } catch (error) {
    console.log(error);
  }
}
