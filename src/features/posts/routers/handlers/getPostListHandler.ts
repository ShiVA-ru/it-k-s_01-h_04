import { Request, Response } from "express";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { mapEntityToViewModel } from "../mappers/mapEntityToViewModel";
import { PostViewModel } from "../../models/PostViewModel";
import { blogsRepository } from "../../../blogs/repositories/blogs.repository";
import { postsRepository } from "../../repositories/posts.repository";

export async function getPostListHandler(
  req: Request,
  res: Response<PostViewModel[]>,
) {
  const findEntity = await postsRepository.findAll();
  const blogs = await blogsRepository.findAll();
  const blogsIdsNames = new Map(
    blogs.map((blog) => [blog._id.toString(), blog.name]),
  );

  res
    .status(HttpStatus.Ok)
    .json(
      findEntity.map((post) =>
        mapEntityToViewModel(post, blogsIdsNames.get(post.blogId) ?? ""),
      ),
    );
}
