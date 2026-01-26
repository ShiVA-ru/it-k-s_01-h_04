import { body } from "express-validator";
import { URL_REGEX } from "../../../core/constants";

const titleValidation = body("title")
  .trim()
  .isString()
  .withMessage("Field must be a string")
  .isLength({ min: 1, max: 30 })
  .withMessage("Field length must be between 1 and 30 characters");

const shortDescriptionValidation = body("shortDescription")
  .trim()
  .isString()
  .withMessage("Field must be a string")
  .isLength({ min: 1, max: 100 })
  .withMessage("Field length must be between 1 and 100 characters");

const contentValidation = body("content")
  .trim()
  .isString()
  .withMessage("Field must be a string")
  .isLength({ min: 1, max: 1000 })
  .withMessage("Field length must be between 1 and 1000 characters");

const blogIdValidation = body("blogId")
  .trim()
  .isMongoId()
  .withMessage("Field must be a valid MongoDB ObjectId")
  .isString()
  .withMessage("Field must be a string")
  .isLength({ min: 1, max: 100 })
  .withMessage("Field length must be between 1 and 100 characters");

export const postInputDtoValidation = [
  titleValidation,
  shortDescriptionValidation,
  contentValidation,
  blogIdValidation,
];

// export enum BlogSortFields {
//   CREATED_AT = 'createdAt',
//   NAME = 'name',
// }
// export enum PostSortFields {
//   CREATED_AT = 'createdAt',
//   TITLE = 'title',
//   BLOG_NAME = 'blogName',
// }
