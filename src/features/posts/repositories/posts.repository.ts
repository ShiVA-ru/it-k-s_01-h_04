import { ObjectId, WithId } from "mongodb";
import { PostDb } from "../types/posts.db.type";
import { postsCollection } from "../../../db/mongo";
import { PostsQueryInput } from "../types/posts.query.type";
import { buildDbQueryOptions } from "../../../core/utils/build-db-query-options";

export const postsRepository = {
  async create(dto: PostDb): Promise<string> {
    const result = await postsCollection.insertOne(dto);

    return result.insertedId.toString();
  },

  async findAll(queryDto: PostsQueryInput): Promise<{
    items: WithId<PostDb>[];
    totalCount: number;
  }> {
    // const { pageNumber, pageSize, sortBy, sortDirection } = queryDto;
    const { skip, limit, sort, filter } = buildDbQueryOptions(queryDto);

    // const skip = (pageNumber - 1) * pageSize;
    // const sort: Record<string, 1 | -1> = {
    // [sortBy]: sortDirection === "asc" ? 1 : -1,
    // };
    // const items = await postsCollection
    //   .find()
    //   .skip(skip)
    //   .limit(pageSize)
    //   .sort(sort)
    //   .toArray();

    const items = await postsCollection
      .find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .toArray();

    const totalCount = await postsCollection.countDocuments(filter);

    return {
      items,
      totalCount,
    };
  },

  async findOneById(id: string): Promise<WithId<PostDb>> {
    const res = await postsCollection.findOne({ _id: new ObjectId(id) });

    if (!res) {
      throw new Error("Post not exist");
    }

    return res;
  },

  async updateById(id: string, dto: PostDb): Promise<void> {
    const updateResult = await postsCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title: dto.title,
          shortDescription: dto.shortDescription,
          content: dto.content,
          blogId: dto.blogId,
          blogName: dto.blogName,
        },
      },
    );

    if (updateResult.matchedCount < 1) {
      throw new Error("Blog not found");
    }

    return;
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

  async deleteByBlogId(blogId: string): Promise<void> {
    const deleteResult = await postsCollection.deleteMany({
      blogId: blogId,
    });

    if (deleteResult.deletedCount < 1) {
      throw new Error("Post not exist");
    }

    return;
  },
};

//! Обработка отсутствующих данных через null
