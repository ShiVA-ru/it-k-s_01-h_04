import { ObjectId, WithId } from "mongodb";
import { blogsCollection } from "../../../db/mongo";
import { BlogDbModel } from "../models/BlogDbModel";
import { BlogInputModel } from "../models/BlogInputModel";

export const blogsRepository = {
  async create(dto: BlogInputModel): Promise<WithId<BlogDbModel>> {
    const newEntity: BlogDbModel = {
      name: dto.name,
      description: dto.description,
      websiteUrl: dto.websiteUrl,
      createdAt: new Date().toISOString(),
      isMembership: false,
    };

    const result = await blogsCollection.insertOne(newEntity);

    const insertedId = result.insertedId;

    return { ...newEntity, _id: insertedId };
  },

  async findAll(): Promise<WithId<BlogDbModel>[]> {
    return blogsCollection.find().toArray();
  },

  async findOneById(id: string): Promise<WithId<BlogDbModel> | null> {
    return blogsCollection.findOne({ _id: new ObjectId(id) });
  },

  async updateById(id: string, dto: BlogInputModel): Promise<Boolean> {
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
      return false;
    }

    return true;
  },

  async deleteById(id: string): Promise<void> {
    const deleteResult = await blogsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (deleteResult.deletedCount < 1) {
      throw new Error("Blog not exist");
    }

    return;
  },
};
