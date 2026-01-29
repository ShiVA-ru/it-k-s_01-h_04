import { ObjectId, WithId } from "mongodb";
import { blogsCollection } from "../../../db/mongo";
import { BlogDb } from "../types/blogs.db.type";
import { BlogInput } from "../types/blogs.input.type";
import { blogsRepository } from "../repositories/blogs.repository";
import { BlogsQueryInput } from "../types/blogs.query.type";

export const blogsService = {
  async create(dto: BlogInput): Promise<string> {
    const newEntity: BlogDb = {
      name: dto.name,
      description: dto.description,
      websiteUrl: dto.websiteUrl,
      createdAt: new Date().toISOString(),
      isMembership: false,
    };

    return blogsRepository.create(newEntity);
  },

  async findAll(
    queryDto: BlogsQueryInput,
  ): Promise<{ items: WithId<BlogDb>[]; totalCount: number }> {
    return blogsRepository.findAll(queryDto);
  },

  async findOneById(id: string): Promise<WithId<BlogDb> | null> {
    return blogsRepository.findOneById(new ObjectId(id));
  },

  async updateById(id: string, dto: BlogInput): Promise<Boolean> {
    return await blogsRepository.updateById(new ObjectId(id), dto);
  },

  async deleteById(id: string): Promise<Boolean> {
    return await blogsRepository.deleteById(id);
  },
};
