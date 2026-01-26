import { ObjectId, WithId } from "mongodb";
import { blogsCollection } from "../../../db/mongo";
import { BlogDb } from "../types/blogs.db.type";
import { BlogInput } from "../types/blogs.input.type";
import { blogsRepository } from "../repositories/blogs.repository";

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

  async findAll(): Promise<WithId<BlogDb>[]> {
    return blogsRepository.findAll();
  },

  async findOneById(id: string): Promise<WithId<BlogDb>> {
    return blogsRepository.findOneById(new ObjectId(id));
  },

  async updateById(id: string, dto: BlogInput): Promise<void> {
    await blogsRepository.updateById(new ObjectId(id), dto);

    return;
  },

  async deleteById(id: string): Promise<void> {
    await blogsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    return;
  },
};
