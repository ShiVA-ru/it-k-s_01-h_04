import express, { Express } from "express";
import request from "supertest";
import { setupApp } from "../../../src/setup-app";
import { BlogInputModel } from "../../../src/features/blogs/models/BlogInputModel";
import { HttpStatus } from "../../../src/core/types/http-statuses";
import { HttpStatusType } from "../../../src/core/types/http-statuses";
import { RouterPath } from "../../../src/core/constants";
import { generateBasicAuthToken } from "./generate-admin-auth-token";
import { runDB } from "../../../src/db/mongo";
import config from "../../../src/core/settings/config";

export const blogsTestManager = {
  adminToken: generateBasicAuthToken(),
  async initApp() {
    const app = express();
    setupApp(app);

    await runDB(config.mongoUrl);

    return app;
  },
  async createEntity(
    app: Express,
    data: BlogInputModel,
    expectedStatusCode: HttpStatusType = HttpStatus.Created,
  ) {
    const response = await request(app)
      .post(RouterPath.blogs)
      .set("Authorization", this.adminToken)
      .send(data)
      .expect(expectedStatusCode);

    let createdEntity;

    if (expectedStatusCode === HttpStatus.Created) {
      createdEntity = response.body;

      expect(createdEntity).toEqual({
        id: expect.any(String),
        name: data.name,
        description: data.description,
        websiteUrl: data.websiteUrl,
      });
    }

    return { response, createdEntity };
  },
};
