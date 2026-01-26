import express, { Express } from "express";
import request from "supertest";
import { setupApp } from "../../../src/setup-app";
import { PostInputModel } from "../../../src/features/posts/models/PostInputModel";
import { HttpStatus } from "../../../src/core/types/http-statuses";
import { HttpStatusType } from "../../../src/core/types/http-statuses";
import { RouterPath } from "../../../src/core/constants";
import { PostViewModel } from "../../../src/features/posts/models/PostViewModel";
import { generateBasicAuthToken } from "./generate-admin-auth-token";
import { runDB } from "../../../src/db/mongo";
import config from "../../../src/core/settings/config";

export const postsTestManager = {
  adminToken: generateBasicAuthToken(),
  async initApp() {
    const app = express();
    setupApp(app);

    await runDB(config.mongoUrl);

    return app;
  },

  async createEntity(
    app: Express,
    data: PostInputModel,
    expectedStatusCode: HttpStatusType = HttpStatus.Created,
  ) {
    const response = await request(app)
      .post(RouterPath.posts)
      .set("Authorization", this.adminToken)
      .send(data)
      .expect(expectedStatusCode);

    let createdEntity: PostViewModel | null = null;

    if (expectedStatusCode === HttpStatus.Created) {
      createdEntity = response.body;

      expect(createdEntity).toEqual({
        id: expect.any(String),
        title: data.title,
        shortDescription: data.shortDescription,
        content: data.content,
        blogId: data.blogId,
        blogName: expect.any(String),
      });
    }

    return { response, createdEntity };
  },
};
