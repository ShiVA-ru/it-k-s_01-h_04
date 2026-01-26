import { ObjectId, WithId } from "mongodb";
import { blogsCollection } from "../../../db/mongo";
import { BlogDb } from "../types/blogs.db.type";
import { BlogInput } from "../types/blogs.input.type";

export const blogsRepository = {
  async create(dto: BlogDb): Promise<string> {
    const result = await blogsCollection.insertOne(dto);

    return result.insertedId.toString();
  },

  async findAll(): Promise<WithId<BlogDb>[]> {
    return blogsCollection.find().toArray();
  },

  async findOneById(_id: ObjectId): Promise<WithId<BlogDb>> {
    const res = await blogsCollection.findOne({ _id });

    if (!res) {
      throw new Error("Blog not found");
    }

    return res;
  },

  async updateById(id: ObjectId, dto: BlogInput): Promise<void> {
    const updateResult = await blogsCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name: dto.name,
          description: dto.description,
          websiteUrl: dto.websiteUrl,
        },
      },
    );

    if (updateResult.matchedCount < 1) {
      throw new Error("Blog not found");
    }

    return;
  },

  async deleteById(_id: ObjectId): Promise<void> {
    const deleteResult = await blogsCollection.deleteOne({
      _id,
    });

    if (deleteResult.deletedCount < 1) {
      throw new Error("Blog not exist");
    }

    return;
  },
};
