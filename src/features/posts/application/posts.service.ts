import { WithId } from "mongodb";
import { PostDb } from "../types/posts.db.type";
import { PostInput } from "../types/posts.input.type";
import { postsRepository } from "../repositories/posts.repository";
import { blogsService } from "../../blogs/application/blogs.service";
import { PostsQueryInput } from "../types/posts.query.type";

export const postsService = {
  async create(dto: PostInput): Promise<string | null> {
    const blogEntity = await blogsService.findOneById(dto.blogId);

    if (!blogEntity) {
      return null;
    }

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

  async findOneById(id: string): Promise<WithId<PostDb> | null> {
    return postsRepository.findOneById(id);
  },

  async updateById(
    id: string,
    dto: PostInput,
  ): Promise<{ notFound: boolean; entity: "post" | "blog" | null }> {
    const blogEntity = await blogsService.findOneById(dto.blogId);

    if (!blogEntity) {
      return { notFound: true, entity: "blog" };
    }

    const isUpdated = await postsRepository.updateById(id, {
      ...dto,
      blogName: blogEntity.name,
    });

    if (!isUpdated) {
      return { notFound: true, entity: "post" };
    }

    return { notFound: false, entity: null };
  },

  async deleteById(id: string): Promise<Boolean> {
    return await postsRepository.deleteById(id);
  },

  async findPostByBlogId(
    blogId: string,
    queryDto: PostsQueryInput,
  ): Promise<{ items: WithId<PostDb>[]; totalCount: number } | null> {
    const blogEntity = await blogsService.findOneById(blogId);

    if (!blogEntity) {
      return null;
    }

    return postsRepository.findByBlogId(blogId, queryDto);
  },
};
