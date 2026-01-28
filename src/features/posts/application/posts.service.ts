import { ObjectId, WithId } from "mongodb";
import { blogsCollection } from "../../../db/mongo";
import { PostDb } from "../types/posts.db.type";
import { PostInput } from "../types/posts.input.type";
import { postsRepository } from "../repositories/posts.repository";
import { blogsService } from "../../blogs/application/blogs.service";
import { PostSortFields } from "../validation/posts.query.validation.middleware";
import { PaginationAndSorting } from "../../../core/types/pagination-and-sorting.type";
import { PostsQueryInput } from "../types/posts.query.type";

export const postsService = {
  async create(dto: PostInput): Promise<string> {
    const blogEntity = await blogsService.findOneById(dto.blogId);

    const newEntity: PostDb = {
      title: dto.title,
      shortDescription: dto.shortDescription,
      content: dto.content,
      blogId: dto.blogId,
      blogName: blogEntity.name,
      createdAt: new Date().toISOString(),
    };

    return postsRepository.create(newEntity);
  },

  async findAll(
    queryDto: PostsQueryInput,
  ): Promise<{ items: WithId<PostDb>[]; totalCount: number }> {
    return postsRepository.findAll(queryDto);
  },

  async findOneById(id: string): Promise<WithId<PostDb>> {
    return postsRepository.findOneById(new ObjectId(id));
  },

  async updateById(id: string, dto: PostInput): Promise<void> {
    const blogEntity = await blogsService.findOneById(dto.blogId);
    await postsRepository.updateById(new ObjectId(id), {
      ...dto,
      blogName: blogEntity.name,
    });

    return;
  },

  async deleteById(id: string): Promise<void> {
    await blogsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    return;
  },
};
