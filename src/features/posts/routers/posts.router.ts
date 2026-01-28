import { Router } from "express";
import { createPostHandler } from "./handlers/posts.create.handler";
import { getPostListHandler } from "./handlers/posts.get-list.handler";
import { getPostHandler } from "./handlers/posts.get.handler";
import { updatePostHandler } from "./handlers/posts.update.handler";
import { deletePostHandler } from "./handlers/posts.delete.handler";
import { idValidation } from "../../../core/middlewares/validation/params-id-validation.middleware";
import { inputValidationResultMiddleware } from "../../../core/middlewares/validation/input-validation-result.middleware";
import { postInputDtoValidation } from "../validation/posts.input-dto.validation.middleware";
import { superAdminGuardMiddleware } from "../../../auth/middlewares/super-admin.guard.middleware";
import { paginationAndSortingValidation } from "../validation/posts.query.validation.middleware";

export const PostsRouter = Router();

//Заменить тип Response PostView на DTO

PostsRouter
  //CREATE
  .post(
    "/",
    superAdminGuardMiddleware,
    postInputDtoValidation,
    inputValidationResultMiddleware,
    createPostHandler,
  )
  //READ
  .get(
    "/",
    paginationAndSortingValidation,
    inputValidationResultMiddleware,
    getPostListHandler,
  )

  .get("/:id", idValidation, inputValidationResultMiddleware, getPostHandler)
  //UPDATE
  .put(
    "/:id",
    superAdminGuardMiddleware,
    idValidation,
    postInputDtoValidation,
    inputValidationResultMiddleware,
    updatePostHandler,
  )
  //DELETE
  .delete(
    "/:id",
    superAdminGuardMiddleware,
    idValidation,
    inputValidationResultMiddleware,
    deletePostHandler,
  );
