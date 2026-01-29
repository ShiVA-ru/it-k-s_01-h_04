import { ObjectId, WithId } from "mongodb";
import { blogsCollection } from "../../../db/mongo";
import { BlogDb } from "../types/blogs.db.type";
import { BlogInput } from "../types/blogs.input.type";
import { BlogsQueryInput } from "../types/blogs.query.type";
import { buildDbQueryOptions } from "../../../core/utils/build-db-query-options";

export const blogsRepository = {
  async create(dto: BlogDb): Promise<string> {
    const result = await blogsCollection.insertOne(dto);

    return result.insertedId.toString();
  },

  async findAll(queryDto: BlogsQueryInput): Promise<{
    items: WithId<BlogDb>[];
    totalCount: number;
  }> {
    const { skip, limit, sort, filter } = buildDbQueryOptions(queryDto);
    const items = await blogsCollection
      .find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .toArray();

    const totalCount = await blogsCollection.countDocuments(filter);

    return {
      items,
      totalCount,
    };
  },

  async findOneById(_id: ObjectId): Promise<WithId<BlogDb> | null> {
    const res = await blogsCollection.findOne({ _id });

    if (!res) {
      return null;
    }

    return res;
  },

  async updateById(id: ObjectId, dto: BlogInput): Promise<Boolean> {
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

  async deleteById(id: string): Promise<Boolean> {
    const deleteResult = await blogsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (deleteResult.deletedCount < 1) {
      return false;
    }

    return true;
  },
};
