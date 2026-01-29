import { Router } from "express";
import { createBlogHandler } from "./handlers/blogs.create.handler";
import { getBlogListHandler } from "./handlers/blogs.get-list.handler";
import { getBlogHandler } from "./handlers/blogs.get.handler";
import { updateBlogHandler } from "./handlers/blogs.update.handler";
import { deleteBlogHandler } from "./handlers/blogs.delete.handler";
import { blogInputDtoValidation } from "../validation/blogs.input-dto.validation.middleware";
import { idValidation } from "../../../core/middlewares/validation/params-id-validation.middleware";
import { inputValidationResultMiddleware } from "../../../core/middlewares/validation/input-validation-result.middleware";
import { superAdminGuardMiddleware } from "../../../auth/middlewares/super-admin.guard.middleware";
import { paginationSortingSearchValidation } from "../validation/blogs.query.validation.middleware";
import { paginationSortingValidation } from "../../posts/validation/posts.query.validation.middleware";
import { getPostListHandler } from "../../posts/routers/handlers/posts.get-list.handler";
import { getBlogPostsListHandler } from "./handlers/blogs-posts.get-list.handler";
import {
  blogPostInputDtoValidation,
  postInputDtoValidation,
} from "../../posts/validation/posts.input-dto.validation.middleware";
import { createPostHandler } from "../../posts/routers/handlers/posts.create.handler";
import { createBlogPostHandler } from "./handlers/blogs-posts.create.handler";

export const blogsRouter = Router();

blogsRouter
  .post(
    "/",
    superAdminGuardMiddleware,
    blogInputDtoValidation,
    inputValidationResultMiddleware,
    createBlogHandler,
  )

  .get(
    "/",
    paginationSortingSearchValidation,
    inputValidationResultMiddleware,
    getBlogListHandler,
  )

  .get("/:id", idValidation, inputValidationResultMiddleware, getBlogHandler)

  .put(
    "/:id",
    superAdminGuardMiddleware,
    idValidation,
    blogInputDtoValidation,
    inputValidationResultMiddleware,
    updateBlogHandler,
  )

  .delete(
    "/:id",
    superAdminGuardMiddleware,
    idValidation,
    inputValidationResultMiddleware,
    deleteBlogHandler,
  )

  .get(
    "/:id/posts",
    paginationSortingValidation,
    inputValidationResultMiddleware,
    getBlogPostsListHandler,
  )

  .post(
    "/:id/posts",
    superAdminGuardMiddleware,
    idValidation,
    blogPostInputDtoValidation,
    inputValidationResultMiddleware,
    createBlogPostHandler,
  );
