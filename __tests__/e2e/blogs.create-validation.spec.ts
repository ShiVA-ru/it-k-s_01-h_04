import { Express } from "express";
import request from "supertest";
import { HttpStatus } from "../../src/core/types/http-statuses";
import { blogsTestManager } from "./utils/BlogsTestManager";
import { BlogInputModel } from "../../src/features/blogs/models/BlogInputModel";
import { BlogViewModel } from "../../src/features/blogs/models/BlogViewModel";
import { RouterPath } from "../../src/core/constants";

describe("create tests for /blogs", () => {
  let app: Express;
  let createdEntity1: BlogViewModel;
  let createdEntity2: BlogViewModel;

  beforeAll(async () => {
    app = await blogsTestManager.initApp();
    await request(app).delete(`${RouterPath.testing}/all-data`);
  });

  it("shouldn't create entity with empty name field", async () => {
    const data: BlogInputModel = {
      name: "",
      description: "string",
      websiteUrl: "https://www.rogaikopyta.com",
    };

    await blogsTestManager.createEntity(app, data, HttpStatus.BadRequest);

    await request(app).get(RouterPath.blogs).expect(HttpStatus.Ok, []);
  });

  it("shouldn't create entity with name field more than 15", async () => {
    const data: BlogInputModel = {
      name: "Name1Name1Name1Name1",
      description: "string",
      websiteUrl: "https://www.rogaikopyta.com",
    };

    await blogsTestManager.createEntity(app, data, HttpStatus.BadRequest);

    await request(app).get(RouterPath.blogs).expect(HttpStatus.Ok, []);
  });

  it("shouldn't create entity with empty description field", async () => {
    const data: BlogInputModel = {
      name: "Name1",
      description: "",
      websiteUrl: "https://www.rogaikopyta.com",
    };

    await blogsTestManager.createEntity(app, data, HttpStatus.BadRequest);

    await request(app).get(RouterPath.blogs).expect(HttpStatus.Ok, []);
  });

  it("shouldn't create entity with empty websiteUrl field", async () => {
    const data: BlogInputModel = {
      name: "Name1",
      description: "descr",
      websiteUrl: "",
    };

    await blogsTestManager.createEntity(app, data, HttpStatus.BadRequest);

    await request(app).get(RouterPath.blogs).expect(HttpStatus.Ok, []);
  });

  it("shouldn't create entity with incorrect websiteUrl field - http protocol", async () => {
    const data: BlogInputModel = {
      name: "Name1",
      description: "descr",
      websiteUrl: "http://www.rogaikopyta.com",
    };

    await blogsTestManager.createEntity(app, data, HttpStatus.BadRequest);

    await request(app).get(RouterPath.blogs).expect(HttpStatus.Ok, []);
  });

  it("shouldn't create entity with incorrect websiteUrl field - no slashes", async () => {
    const data: BlogInputModel = {
      name: "Name1",
      description: "descr",
      websiteUrl: "http:www.rogaikopyta.com",
    };

    await blogsTestManager.createEntity(app, data, HttpStatus.BadRequest);

    await request(app).get(RouterPath.blogs).expect(HttpStatus.Ok, []);
  });
});
