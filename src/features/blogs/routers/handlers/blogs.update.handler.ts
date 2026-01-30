import { Response } from "express";
import { RequestWithParamsAndBody } from "../../../../core/types/request.types";
import { URIParamsId } from "../../../../core/types/uri-params.type";
import { BlogInput } from "../../types/blogs.input.type";
import { BlogView } from "../../types/blogs.view.type";
import { validationErrorsDto } from "../../../../core/types/errors.types";
import { HttpStatus } from "../../../../core/types/http-statuses.types";
import { blogsService } from "../../application/blogs.service";

export async function updateBlogHandler(
  req: RequestWithParamsAndBody<URIParamsId, BlogInput>,
  res: Response<BlogView | validationErrorsDto>,
) {
  try {
    const isUpdated = await blogsService.updateById(req.params.id, req.body);

    if (!isUpdated) {
      res.sendStatus(HttpStatus.NotFound);
      return;
    }

    res.sendStatus(HttpStatus.NoContent);
  } catch (error) {
    console.error(error);
    res.sendStatus(HttpStatus.NotFound);
  }
}
