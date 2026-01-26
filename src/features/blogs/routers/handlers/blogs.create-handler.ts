import { Response } from "express";
import { RequestWithBody } from "../../../../core/types/request.types";
import { BlogInput } from "../../types/blogs.input.type";
import { HttpStatus } from "../../../../core/types/http-statuses.types";
import { BlogView } from "../../types/blogs.view.type";
import { mapEntityToViewModel } from "../mappers/blogs.entity-map";
import { blogsRepository } from "../../repositories/blogs.repository";
import { validationResult } from "express-validator";

export async function createBlogHandler(
  req: RequestWithBody<BlogInput>,
  res: Response<BlogView>,
) {
  const createdEntity = await blogsRepository.create(req.body);

  res.status(HttpStatus.Created).json(mapEntityToViewModel(createdEntity));
}
