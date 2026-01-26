import { WithId } from "mongodb";
import { PostDbModel } from "../../models/PostDbModel";
import { PostViewModel } from "../../models/PostViewModel";

export const mapEntityToViewModel = (
  dbEntity: WithId<PostDbModel>,
  blogName: string,
): PostViewModel => ({
  id: dbEntity._id.toString(),
  title: dbEntity.title,
  shortDescription: dbEntity.shortDescription,
  content: dbEntity.content,
  blogId: dbEntity.blogId,
  blogName: blogName,
  createdAt: dbEntity.createdAt,
});
