import { Response } from "express";
import { RequestWithParams } from "../../../../core/types/request-types";
import { URIParamsBlogIdModel } from "../../models/URIParamsBlogModel";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { blogsRepository } from "../../repositories/blogs.repository";
import { createErrorMessages } from "../../../../core/middlewares/input-validtion-result.middleware";

export async function deleteBlogHandler(
  req: RequestWithParams<URIParamsBlogIdModel>,
  res: Response,
) {
  const id = req.params.id;

  const blog = await blogsRepository.findOneById(id);

  if (!blog) {
    res
      .status(HttpStatus.NotFound)
      .send(createErrorMessages([{ field: "id", message: "Blog not found" }]));
    return;
  }

  await blogsRepository.deleteById(id);

  return res.sendStatus(HttpStatus.NoContent);
}
