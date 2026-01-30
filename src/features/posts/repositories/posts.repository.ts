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
    const { skip, limit, sort, filter } = buildDbQueryOptions(queryDto);

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

  async findOneById(id: string): Promise<WithId<PostDb> | null> {
    const res = await postsCollection.findOne({ _id: new ObjectId(id) });

    if (!res) {
      return null;
    }

    return res;
  },

  async updateById(id: string, dto: PostDb): Promise<Boolean> {
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
      return false;
    }

    return true;
  },

  async deleteById(id: string): Promise<Boolean> {
    const deleteResult = await postsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (deleteResult.deletedCount < 1) {
      return false;
    }

    return true;
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

  async findByBlogId(
    blogId: string,
    queryDto: PostsQueryInput,
  ): Promise<{
    items: WithId<PostDb>[];
    totalCount: number;
  }> {
    // const { pageNumber, pageSize, sortBy, sortDirection } = queryDto;
    const { skip, limit, sort } = buildDbQueryOptions(queryDto);

    const filter = { blogId: blogId };

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
};
