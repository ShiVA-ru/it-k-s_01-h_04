import { Router, Request, Response } from "express";
import { HttpStatus } from "../core/types/http-statuses";
import { blogsCollection, postsCollection } from "../db/mongo";

export const testingRouter = Router();

testingRouter.get("/", (req: Request, res: Response) => {
  res.status(HttpStatus.Ok).send("testing url");
});

testingRouter.delete("/all-data", async (req: Request, res: Response) => {
  await postsCollection.drop();
  await blogsCollection.drop();

  res.sendStatus(HttpStatus.NoContent);
});
