import { Express } from "express";
import request from "supertest";
import { HttpStatus } from "../../src/core/types/http-statuses";
import { blogsTestManager } from "./utils/BlogsTestManager";
import { BlogInputModel } from "../../src/features/blogs/models/BlogInputModel";
import { BlogViewModel } from "../../src/features/blogs/models/BlogViewModel";
import { RouterPath } from "../../src/core/constants";

describe("update tests for /blogs", () => {
  let app: Express;
  let createdEntity1: BlogViewModel;
  let createdEntity2: BlogViewModel;
  const adminToken = blogsTestManager.adminToken;
  const data1: BlogInputModel = {
    name: "Name1",
    description: "string",
    websiteUrl: "https://www.rogaikopyta.com",
  };
  const data2: BlogInputModel = {
    name: "Name1",
    description: "string",
    websiteUrl: "https://www.rogaikopyta.com",
  };

  beforeAll(async () => {
    app = await blogsTestManager.initApp();
    await request(app).delete(`${RouterPath.testing}/all-data`);

    const { createdEntity } = await blogsTestManager.createEntity(app, data1);

    createdEntity1 = createdEntity;

    const { createdEntity: anotherCreatedEntity } =
      await blogsTestManager.createEntity(app, data2);

    createdEntity2 = anotherCreatedEntity;
  });

  it("shouldn't update entity with empty name field", async () => {
    const data: BlogInputModel = {
      name: "",
      description: "descr",
      websiteUrl: "https://www.rogaikopyta.com",
    };

    await request(app)
      .put(`${RouterPath.blogs}/${createdEntity1.id}`)
      .set("Authorization", adminToken)
      .send(data)
      .expect(HttpStatus.BadRequest);

    await request(app)
      .get(`${RouterPath.blogs}/${createdEntity1.id}`)
      .expect(HttpStatus.Ok, createdEntity1);
  });

  it("shouldn't update entity with incorrect name length more than 15", async () => {
    const data: BlogInputModel = {
      name: "Name1Name1Name1Name1Name1",
      description: "descr",
      websiteUrl: "https://www.rogaikopyta.com",
    };

    await request(app)
      .put(`${RouterPath.blogs}/${createdEntity1.id}`)
      .set("Authorization", adminToken)
      .send(data)
      .expect(HttpStatus.BadRequest);

    await request(app)
      .get(`${RouterPath.blogs}/${createdEntity1.id}`)
      .expect(HttpStatus.Ok, createdEntity1);
  });

  it("shouldn't update entity with incorrect description length less than 1", async () => {
    const data: BlogInputModel = {
      name: "Name1",
      description: "",
      websiteUrl: "https://www.rogaikopyta.com",
    };

    await request(app)
      .put(`${RouterPath.blogs}/${createdEntity1.id}`)
      .set("Authorization", adminToken)
      .send(data)
      .expect(HttpStatus.BadRequest);

    await request(app)
      .get(`${RouterPath.blogs}/${createdEntity1.id}`)
      .expect(HttpStatus.Ok, createdEntity1);
  });

  // it("shouldn't update entity with incorrect author length less than 1", async () => {
  //   const data: BlogInputModel = {
  //     title: "video",
  //     author: "",
  //     canBeDownloaded: true,
  //     minAgeRestriction: 12,
  //     publicationDate: new Date().toISOString(),
  //     availableResolutions: [VideoResolutions.P1080, VideoResolutions.P1440],
  //   };

  //   await request(app)
  //     .put(`${RouterPath.blogs}/${createdEntity1.id}`)
  //     .send(data)
  //     .expect(HttpStatus.BadRequest);

  //   await request(app)
  //     .get(`${RouterPath.blogs}/${createdEntity1.id}`)
  //     .expect(HttpStatus.Ok, createdEntity1);
  // });

  // it("shouldn't update entity with incorrect author length more than 20", async () => {
  //   const data: BlogInputModel = {
  //     title: "video",
  //     author: "AuthorAuthorAuthorAuthor",
  //     canBeDownloaded: true,
  //     minAgeRestriction: 12,
  //     publicationDate: new Date().toISOString(),
  //     availableResolutions: [VideoResolutions.P1080, VideoResolutions.P1440],
  //   };

  //   await request(app)
  //     .put(`${RouterPath.blogs}/${createdEntity1.id}`)
  //     .send(data)
  //     .expect(HttpStatus.BadRequest);

  //   await request(app)
  //     .get(`${RouterPath.blogs}/${createdEntity1.id}`)
  //     .expect(HttpStatus.Ok, createdEntity1);
  // });

  // it("shouldn't update entity with incorrect minAgeRestriction less than 1", async () => {
  //   const data: BlogInputModel = {
  //     title: "video",
  //     author: "Author",
  //     canBeDownloaded: true,
  //     minAgeRestriction: 0,
  //     publicationDate: new Date().toISOString(),
  //     availableResolutions: [VideoResolutions.P1080, VideoResolutions.P1440],
  //   };

  //   await request(app)
  //     .put(`${RouterPath.blogs}/${createdEntity1.id}`)
  //     .send(data)
  //     .expect(HttpStatus.BadRequest);

  //   await request(app)
  //     .get(`${RouterPath.blogs}/${createdEntity1.id}`)
  //     .expect(HttpStatus.Ok, createdEntity1);
  // });

  // it("shouldn't update entity with incorrect minAgeRestriction more than 18", async () => {
  //   const data: BlogInputModel = {
  //     title: "video",
  //     author: "Author",
  //     canBeDownloaded: true,
  //     minAgeRestriction: 20,
  //     publicationDate: new Date().toISOString(),
  //     availableResolutions: [VideoResolutions.P1080, VideoResolutions.P1440],
  //   };

  //   await request(app)
  //     .put(`${RouterPath.blogs}/${createdEntity1.id}`)
  //     .send(data)
  //     .expect(HttpStatus.BadRequest);

  //   await request(app)
  //     .get(`${RouterPath.blogs}/${createdEntity1.id}`)
  //     .expect(HttpStatus.Ok, createdEntity1);
  // });

  // it("shouldn't update entity with incorrect publicationDate", async () => {
  //   const data: BlogInputModel = {
  //     title: "video",
  //     author: "Author",
  //     canBeDownloaded: true,
  //     minAgeRestriction: 15,
  //     publicationDate: "dfsdf",
  //     availableResolutions: [VideoResolutions.P1080, VideoResolutions.P1440],
  //   };

  //   await request(app)
  //     .put(`${RouterPath.blogs}/${createdEntity1.id}`)
  //     .send(data)
  //     .expect(HttpStatus.BadRequest);

  //   await request(app)
  //     .get(`${RouterPath.blogs}/${createdEntity1.id}`)
  //     .expect(HttpStatus.Ok, createdEntity1);
  // });

  // it("shouldn't update entity with incorrect availableResolutions length less than 1", async () => {
  //   const data: BlogInputModel = {
  //     title: "video",
  //     author: "Author",
  //     canBeDownloaded: true,
  //     minAgeRestriction: 15,
  //     publicationDate: new Date().toISOString(),
  //     availableResolutions: [],
  //   };

  //   await request(app)
  //     .put(`${RouterPath.blogs}/${createdEntity1.id}`)
  //     .send(data)
  //     .expect(HttpStatus.BadRequest);

  //   await request(app)
  //     .get(`${RouterPath.blogs}/${createdEntity1.id}`)
  //     .expect(HttpStatus.Ok, createdEntity1);
  // });

  // it("shouldn't update entity that not exist", async () => {
  //   const data: BlogInputModel = {
  //     title: "Title",
  //     author: "New Author",
  //     canBeDownloaded: true,
  //     minAgeRestriction: 12,
  //     publicationDate: new Date().toISOString(),
  //     availableResolutions: [VideoResolutions.P1080, VideoResolutions.P1440],
  //   };
  //   await request(app)
  //     .put(`${RouterPath.blogs}/123`)
  //     .send(data)
  //     .expect(HttpStatus.NotFound);
  // });

  // it("should update entity with correct input data", async () => {
  //   const data: BlogInputModel = {
  //     title: "Title",
  //     author: "New Author",
  //     canBeDownloaded: true,
  //     minAgeRestriction: 12,
  //     publicationDate: new Date().toISOString(),
  //     availableResolutions: [VideoResolutions.P1080, VideoResolutions.P1440],
  //   };
  //   await request(app)
  //     .put(`${RouterPath.blogs}/${createdEntity1.id}`)
  //     .send(data)
  //     .expect(HttpStatus.NoContent);

  //   await request(app)
  //     .get(`${RouterPath.blogs}/${createdEntity1.id}`)
  //     .expect(HttpStatus.Ok, { ...createdEntity1, ...data });

  //   await request(app)
  //     .get(`${RouterPath.blogs}/${createdEntity2.id}`)
  //     .expect(HttpStatus.Ok, createdEntity2);
  // });

  // it("should delete entity", async () => {
  //   await request(app)
  //     .delete(`${RouterPath.blogs}/${createdEntity1.id}`)
  //     .expect(HttpStatus.NoContent);

  //   await request(app)
  //     .get(`${RouterPath.blogs}/${createdEntity1.id}`)
  //     .expect(HttpStatus.NotFound);

  //   await request(app)
  //     .get(`${RouterPath.blogs}/${createdEntity2.id}`)
  //     .expect(HttpStatus.Ok, createdEntity2);

  //   await request(app)
  //     .delete(`${RouterPath.blogs}/${createdEntity2.id}`)
  //     .expect(HttpStatus.NoContent);

  //   await request(app)
  //     .get(`${RouterPath.blogs}/${createdEntity2.id}`)
  //     .expect(HttpStatus.NotFound);

  //   await request(app).get(RouterPath.blogs).expect(HttpStatus.Ok, []);
  // });
});
