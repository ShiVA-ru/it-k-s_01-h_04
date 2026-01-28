import { Response } from "express";
import { RequestWithParams } from "../../../../core/types/request.types";
import { URIParamsId } from "../../../../core/types/uri-params.type";
import { BlogView } from "../../types/blogs.view.type";
import { HttpStatus } from "../../../../core/types/http-statuses.types";
import { mapEntityToViewModel } from "../mappers/blogs.entity-map";
import { validationErrorsDto } from "../../../../core/types/errors.types";
import { blogsService } from "../../application/blogs.service";

export async function getBlogHandler(
  req: RequestWithParams<URIParamsId>,
  res: Response<BlogView | validationErrorsDto>,
) {
  try {
    const findEntity = await blogsService.findOneById(req.params.id);

    res.status(HttpStatus.Ok).json(mapEntityToViewModel(findEntity));
  } catch (error) {
    console.log(error);
    res.sendStatus(HttpStatus.NotFound);
  }
}
