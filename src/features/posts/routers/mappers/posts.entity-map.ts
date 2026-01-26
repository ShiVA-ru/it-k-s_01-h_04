import { WithId } from "mongodb";
import { PostDb } from "../../types/posts.db.type";
import { PostView } from "../../types/posts.view.type";

export const mapEntityToViewModel = (
  dbEntity: WithId<PostDb>,
  blogName: string,
): PostView => ({
  id: dbEntity._id.toString(),
  title: dbEntity.title,
  shortDescription: dbEntity.shortDescription,
  content: dbEntity.content,
  blogId: dbEntity.blogId,
  blogName: blogName,
  createdAt: dbEntity.createdAt,
});
