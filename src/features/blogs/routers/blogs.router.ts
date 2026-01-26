import { Router } from "express";
import { createBlogHandler } from "./handlers/createBlogHandler";
import { getBlogListHandler } from "./handlers/getBlogListHandler";
import { getBlogHandler } from "./handlers/getBlogHandler";
import { updateBlogHandler } from "./handlers/updateBlogHandler";
import { deleteBlogHandler } from "./handlers/deleteBlogHandler";
import { blogInputDtoValidation } from "../validation/blogs.input-dto.validation-middleware";
import { idValidation } from "../../../core/middlewares/params-id.validation-middleware";
import { inputValidationResultMiddleware } from "../../../core/middlewares/input-validtion-result.middleware";
import { superAdminGuardMiddleware } from "../../../auth/middlewares/super-admin.guard-middleware";

export const blogsRouter = Router();

blogsRouter
  .post(
    "/",
    superAdminGuardMiddleware,
    blogInputDtoValidation,
    inputValidationResultMiddleware,
    createBlogHandler,
  )

  .get("/", getBlogListHandler)

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
  );
