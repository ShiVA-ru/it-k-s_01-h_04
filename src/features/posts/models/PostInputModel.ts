import { PostViewModel } from "./PostViewModel";

export type PostInputModel = Omit<
  PostViewModel,
  "id" | "blogName" | "createdAt"
>;
