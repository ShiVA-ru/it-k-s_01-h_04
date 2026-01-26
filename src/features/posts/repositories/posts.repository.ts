import { ObjectId, WithId } from "mongodb";
import { PostDb } from "../types/posts.db.type";
import { PostInput } from "../types/posts.input.type";
import { postsCollection } from "../../../db/mongo";

export const postsRepository = {
  async create(dto: PostInput): Promise<WithId<PostDb>> {
    const newEntity: PostDb = {
      title: dto.title,
      shortDescription: dto.shortDescription,
      content: dto.content,
      blogId: dto.blogId,
      createdAt: new Date().toISOString(),
    };

    const result = await postsCollection.insertOne(newEntity);

    const insertedId = result.insertedId;

    return { ...newEntity, _id: insertedId };
  },

  async findAll(): Promise<WithId<PostDb>[]> {
    return postsCollection.find().toArray();
  },

  async findOneById(id: string): Promise<WithId<PostDb> | null> {
    return postsCollection.findOne({ _id: new ObjectId(id) });
  },

  async updateById(id: string, dto: PostInput): Promise<Boolean> {
    const updateResult = await postsCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title: dto.title,
          shortDescription: dto.shortDescription,
          content: dto.content,
          blogId: dto.blogId,
        },
      },
    );

    if (updateResult.matchedCount < 1) {
      return false;
    }

    return true;
  },

  async deleteById(id: string): Promise<void> {
    const deleteResult = await postsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (deleteResult.deletedCount < 1) {
      throw new Error("Post not exist");
    }

    return;
  },
};
