import { Response } from "express";
import { RequestWithParamsAndBody } from "../../../../core/types/request.types";
import { validationErrorsDto } from "../../../../core/types/errors.types";
import { HttpStatus } from "../../../../core/types/http-statuses.types";
import { BlogPostInput } from "../../../posts/types/blogs-posts.input.type";
import { PostView } from "../../../posts/types/posts.view.type";
import { postsService } from "../../../posts/application/posts.service";
import { URIParamsId } from "../../../../core/types/uri-params.type";
import { mapEntityToViewModel } from "../../../posts/routers/mappers/posts.entity-map";

export async function createBlogPostHandler(
  req: RequestWithParamsAndBody<URIParamsId, BlogPostInput>,
  res: Response<PostView | validationErrorsDto>,
) {
  try {
    const blogId = req.params.id;
    const insertedId = await postsService.create({
      blogId,
      title: req.body.title,
      shortDescription: req.body.shortDescription,
      content: req.body.content,
    });

    console.log("createPostHandler", insertedId);

    if (!insertedId) {
      return res.sendStatus(HttpStatus.NotFound);
    }

    const createdEntity = await postsService.findOneById(insertedId);

    if (!createdEntity) {
      return res.sendStatus(HttpStatus.NotFound);
    }

    res.status(HttpStatus.Created).json(mapEntityToViewModel(createdEntity));
  } catch (error) {
    console.log(error);
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
//! Обработка отсутствующих данных через null
