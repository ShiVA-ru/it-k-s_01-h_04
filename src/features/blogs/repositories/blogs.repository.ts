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
    // const { pageNumber, pageSize, sortBy, sortDirection } = queryDto;

    // const skip = (pageNumber - 1) * pageSize;
    // const sort: Record<string, 1 | -1> = {
    //   [sortBy]: sortDirection === "asc" ? 1 : -1,
    // };

    // const items = await blogsCollection
    //   .find()
    //   .skip(skip)
    //   .limit(pageSize)
    //   .sort(sort)
    //   .toArray();
    //
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
