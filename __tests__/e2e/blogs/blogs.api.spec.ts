import { Express } from "express";
import request from "supertest";
import { HttpStatus } from "../../../src/core/types/http-statuses.types";
import { blogsTestManager } from "../utils/blogs.test-manager";
import { BlogInput } from "../../../src/features/blogs/types/blogs.input.type";
import { BlogView } from "../../../src/features/blogs/types/blogs.view.type";
import { RouterPath } from "../../../src/core/constants";
import { ObjectId } from "mongodb";
import { commonTestManager } from "../utils/common.test-manager";

describe("api tests for /blogs", () => {
  let app: Express;
  let createdEntity1: BlogView;
  let createdEntity2: BlogView;
  const adminToken = blogsTestManager.adminToken;

  beforeAll(async () => {
    app = await commonTestManager.initApp();
    await request(app).delete(`${RouterPath.testing}/all-data`);
  });

  afterAll(async () => {
    await commonTestManager.closeApp();
  });

  it("should return 200 and empty array", async () => {
    await request(app).get(RouterPath.blogs).expect(200, []);
  });

  it("should return 404 if not existing entity", async () => {
    await request(app).get(`${RouterPath.blogs}/${new ObjectId()}`).expect(404);
  });

  it("should create entity with correct data", async () => {
    const data: BlogInput = {
      name: "Name1",
      description: "string",
      websiteUrl: "https://www.rogaikopyta.com",
    };

    const { createdEntity } = await blogsTestManager.createEntity(app, data);

    createdEntity1 = createdEntity;

    await request(app).get(RouterPath.blogs).expect(200, [createdEntity1]);
  });

  it("should create another entity with correct data", async () => {
    const data: BlogInput = {
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
