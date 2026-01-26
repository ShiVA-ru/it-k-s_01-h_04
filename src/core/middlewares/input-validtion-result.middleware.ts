import { NextFunction, Request, Response } from "express";
import { ValidationError, validationResult } from "express-validator";
import { HttpStatus } from "../../core/types/http-statuses";
import { validationErrorsDto, validationErrorType } from "../types/errors";

export const createErrorMessages = (
  errors: validationErrorType[],
): validationErrorsDto => {
  return { errorsMessages: errors };
};

const formatErrors = (error: ValidationError) => ({
  field: error.type === "field" ? error.path : null,
  message: error.msg,
});

export const inputValidationResultMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req)
    .formatWith(formatErrors)
    .array({ onlyFirstError: true });

  if (errors.length) {
    return res.status(HttpStatus.BadRequest).json({ errorsMessages: errors });
  }

  next();
};
