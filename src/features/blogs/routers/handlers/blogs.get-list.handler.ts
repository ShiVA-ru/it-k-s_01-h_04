import { Request, Response } from "express";
import { HttpStatus } from "../../../../core/types/http-statuses.types";
import { mapEntityToViewModel } from "../mappers/blogs.entity-map";
import { BlogView } from "../../types/blogs.view.type";
import { blogsRepository } from "../../repositories/blogs.repository";
import { blogsService } from "../../application/blogs.service";

export async function getBlogListHandler(
  req: Request,
  res: Response<BlogView[]>,
) {
  try {
    const findBlogs = await blogsService.findAll();

    res.status(HttpStatus.Ok).json(findBlogs.map(mapEntityToViewModel));
  } catch (error) {
    console.log(error);
  }
}
