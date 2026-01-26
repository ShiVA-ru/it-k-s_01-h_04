import { Response } from "express";
import { RequestWithBody } from "../../../../core/types/request-types";
import { BlogInputModel } from "../../models/BlogInputModel";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { BlogViewModel } from "../../models/BlogViewModel";
import { mapEntityToViewModel } from "../mappers/mapEntityToViewModel";
import { blogsRepository } from "../../repositories/blogs.repository";
import { validationResult } from "express-validator";

export async function createBlogHandler(
  req: RequestWithBody<BlogInputModel>,
  res: Response<BlogViewModel>,
) {
  const createdEntity = await blogsRepository.create(req.body);

  res.status(HttpStatus.Created).json(mapEntityToViewModel(createdEntity));
}
