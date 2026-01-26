import express, { Express } from "express";
import request from "supertest";
import { setupApp } from "../../../src/setup-app";
import { BlogInput } from "../../../src/features/blogs/types/blogs.input.type";
import { HttpStatus } from "../../../src/core/types/http-statuses.types";
import { HttpStatusType } from "../../../src/core/types/http-statuses.types";
import { RouterPath } from "../../../src/core/constants";
import { commonTestManager } from "./common.test-manager";

export const blogsTestManager = {
  adminToken: commonTestManager.adminToken,
  async createEntity(
    app: Express,
    data: BlogInput,
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
        createdAt: expect.any(String),
        isMembership: false,
      });
    }

    return { response, createdEntity };
  },
};
