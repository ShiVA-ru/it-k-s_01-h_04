import { Request, Response } from "express";
import { HttpStatus } from "../../../../core/types/http-statuses.types";
import { mapEntityToViewModel } from "../mappers/blogs.entity-map";
import { BlogView } from "../../types/blogs.view.type";
import { blogsRepository } from "../../repositories/blogs.repository";

export async function getBlogListHandler(
  req: Request,
  res: Response<BlogView[]>,
) {
  const findBlogs = await blogsRepository.findAll();
  res.status(HttpStatus.Ok).json(findBlogs.map(mapEntityToViewModel));
}
