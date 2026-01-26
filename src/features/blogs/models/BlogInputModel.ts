import { BlogViewModel } from "./BlogViewModel";

export type BlogInputModel = Omit<
  BlogViewModel,
  "id" | "createdAt" | "isMembership"
>;
