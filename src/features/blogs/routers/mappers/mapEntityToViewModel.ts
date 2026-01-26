import { WithId } from "mongodb";
import { BlogDbModel } from "../../models/BlogDbModel";
import { BlogViewModel } from "../../models/BlogViewModel";

export const mapEntityToViewModel = (
  dbEntity: WithId<BlogDbModel>,
): BlogViewModel => ({
  id: dbEntity._id.toString(),
  name: dbEntity.name,
  description: dbEntity.description,
  websiteUrl: dbEntity.websiteUrl,
  createdAt: dbEntity.createdAt.toString(),
  isMembership: dbEntity.isMembership,
});
