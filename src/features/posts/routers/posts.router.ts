import { Router } from "express";
import { createPostHandler } from "./handlers/createPostHandler";
import { getPostListHandler } from "./handlers/getPostListHandler";
import { getPostHandler } from "./handlers/getPostHandler";
import { updatePostHandler } from "./handlers/updatePostHandler";
import { deletePostHandler } from "./handlers/deletePostHandler";
import { idValidation } from "../../../core/middlewares/params-id.validation-middleware";
import { inputValidationResultMiddleware } from "../../../core/middlewares/input-validtion-result.middleware";
import { postInputDtoValidation } from "../validation/posts.input-dto.validation-middleware";
import { superAdminGuardMiddleware } from "../../../auth/middlewares/super-admin.guard-middleware";

export const PostsRouter = Router();

//Заменить тип Response PostViewModel на DTO

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
  .get("/", getPostListHandler)

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
