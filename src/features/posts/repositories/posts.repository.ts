import { ObjectId, WithId } from "mongodb";
import { PostDb } from "../types/posts.db.type";
import { PostInput } from "../types/posts.input.type";
import { postsCollection } from "../../../db/mongo";
import { PaginationAndSorting } from "../../../core/types/pagination-and-sorting.type";
import { PostSortFields } from "../validation/posts.query.validation.middleware";
import { PostsQueryInput } from "../types/posts.query.type";

export const postsRepository = {
  async create(dto: PostDb): Promise<string> {
    const result = await postsCollection.insertOne(dto);

    return result.insertedId.toString();
  },

  async findAll(queryDto: PostsQueryInput): Promise<{
    items: WithId<PostDb>[];
    totalCount: number;
  }> {
    const { pageNumber, pageSize, sortBy, sortDirection } = queryDto;

    const skip = (pageNumber - 1) * pageSize;

    const sort: Record<string, 1 | -1> = {
      [sortBy]: sortDirection === "asc" ? 1 : -1,
    };

    const items = await postsCollection
      .find()
      .skip(skip)
      .limit(pageSize)
      .sort(sort)
      .toArray();

    const totalCount = await postsCollection.countDocuments();

    return {
      items,
      totalCount,
    };
  },

  async findOneById(_id: ObjectId): Promise<WithId<PostDb>> {
    const res = await postsCollection.findOne({ _id });

    if (!res) {
      throw new Error("Post not exist");
    }

    return res;
  },

  async updateById(_id: ObjectId, dto: PostDb): Promise<void> {
    const updateResult = await postsCollection.updateOne(
      { _id },
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

  async deleteById(_id: ObjectId): Promise<void> {
    const deleteResult = await postsCollection.deleteOne({
      _id,
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
