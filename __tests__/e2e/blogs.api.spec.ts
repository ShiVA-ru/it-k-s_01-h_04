import { Express } from "express";
import request from "supertest";
import { HttpStatus } from "../../src/core/types/http-statuses";
import { blogsTestManager } from "./utils/BlogsTestManager";
import { BlogInputModel } from "../../src/features/blogs/models/BlogInputModel";
import { BlogViewModel } from "../../src/features/blogs/models/BlogViewModel";
import { RouterPath } from "../../src/core/constants";
import { ObjectId } from "mongodb";

describe("api tests for /blogs", () => {
  let app: Express;
  let createdEntity1: BlogViewModel;
  let createdEntity2: BlogViewModel;
  const adminToken = blogsTestManager.adminToken;

  beforeAll(async () => {
    app = await blogsTestManager.initApp();
    await request(app).delete(`${RouterPath.testing}/all-data`);
  });

  it("should return 200 and empty array", async () => {
    await request(app).get(RouterPath.blogs).expect(200, []);
  });

  it("should return 404 if not existing entity", async () => {
    await request(app).get(`${RouterPath.blogs}/${new ObjectId()}`).expect(404);
  });

  it("should create entity with correct data", async () => {
    const data: BlogInputModel = {
      name: "Name1",
      description: "string",
      websiteUrl: "https://www.rogaikopyta.com",
    };

    const { createdEntity } = await blogsTestManager.createEntity(app, data);

    createdEntity1 = createdEntity;

    await request(app).get(RouterPath.blogs).expect(200, [createdEntity1]);
  });

  it("should create another entity with correct data", async () => {
    const data: BlogInputModel = {
      name: "Name1",
      description: "string",
      websiteUrl: "https://www.rogaikopyta.com",
    };

    const { createdEntity } = await blogsTestManager.createEntity(app, data);

    createdEntity2 = createdEntity;

    await request(app)
      .get(RouterPath.blogs)
      .expect(HttpStatus.Ok, [createdEntity1, createdEntity2]);
  });

  it("should delete entity", async () => {
    await request(app)
      .delete(`${RouterPath.blogs}/${createdEntity1.id}`)
      .set("Authorization", adminToken)
      .expect(HttpStatus.NoContent);

    await request(app)
      .get(`${RouterPath.blogs}/${createdEntity1.id}`)
      .expect(HttpStatus.NotFound);

    await request(app)
      .get(`${RouterPath.blogs}/${createdEntity2.id}`)
      .expect(HttpStatus.Ok, createdEntity2);

    await request(app)
      .delete(`${RouterPath.blogs}/${createdEntity2.id}`)
      .set("Authorization", adminToken)
      .expect(HttpStatus.NoContent);

    await request(app)
      .get(`${RouterPath.blogs}/${createdEntity2.id}`)
      .expect(HttpStatus.NotFound);

    await request(app).get(RouterPath.blogs).expect(HttpStatus.Ok, []);
  });
});
