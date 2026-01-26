import { Request, Response } from "express";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { mapEntityToViewModel } from "../mappers/mapEntityToViewModel";
import { BlogViewModel } from "../../models/BlogViewModel";
import { blogsRepository } from "../../repositories/blogs.repository";

export async function getBlogListHandler(
  req: Request,
  res: Response<BlogViewModel[]>,
) {
  const findBlogs = await blogsRepository.findAll();
  res.status(HttpStatus.Ok).json(findBlogs.map(mapEntityToViewModel));
}
