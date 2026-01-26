import { Express } from "express";
import request from "supertest";
import { HttpStatus } from "../../../src/core/types/http-statuses.types";
import { postsTestManager } from "../utils/posts.test-manager";
import { PostInput } from "../../../src/features/posts/types/posts.input.type";
import { PostView } from "../../../src/features/posts/types/posts.view.type";
import { RouterPath } from "../../../src/core/constants";
import { blogsTestManager } from "../utils/blogs.test-manager";
import { BlogInput } from "../../../src/features/blogs/types/blogs.input.type";
import { BlogView } from "../../../src/features/blogs/types/blogs.view.type";
import { commonTestManager } from "../utils/common.test-manager";

describe("tests for /posts", () => {
  let app: Express;
  let createdEntity1: PostView | null = null;
  let createdEntity2: PostView | null = null;
  let createdBlog: BlogView;
  const adminToken = postsTestManager.adminToken;

  beforeAll(async () => {
    app = await commonTestManager.initApp();
    await request(app).delete(`${RouterPath.testing}/all-data`);

    const blogData: BlogInput = {
      name: "Test Blog",
      description: "Test Blog Description",
      websiteUrl: "https://testblog.com",
    };
    const { createdEntity: blog } = await blogsTestManager.createEntity(
      app,
      blogData,
    );
    createdBlog = blog;
  });

  afterAll(async () => {
    await commonTestManager.closeApp();
  });

  it("should create entity with correct data", async () => {
    const data: PostInput = {
      title: "Title",
      shortDescription: "Short Description",
      content: "Content",
      blogId: createdBlog.id,
    };

    const { createdEntity } = await postsTestManager.createEntity(app, data);

    createdEntity1 = createdEntity;

    await request(app).get(RouterPath.posts).expect(200, [createdEntity1]);
  });

  it("should create another entity with correct data", async () => {
    const data: PostInput = {
      title: "Title 2",
      shortDescription: "Short Description 2",
      content: "Content 2",
      blogId: createdBlog.id,
    };

    const { createdEntity } = await postsTestManager.createEntity(app, data);

    createdEntity2 = createdEntity;

    await request(app)
      .get(RouterPath.posts)
      .expect(HttpStatus.Ok, [createdEntity1, createdEntity2]);
  });

  // it("shouldn't update entity with incorrect title length less than 1", async () => {
  //   const data: UpdateVideoModel = {
  //     title: "",
  //     author: "New Author",
  //     canBeDownloaded: true,
  //     minAgeRestriction: 12,
  //     publicationDate: new Date().toISOString(),
  //     availableResolutions: [VideoResolutions.P1080, VideoResolutions.P1440],
  //   };

  //   await request(app)
  //     .put(`${RouterPath.posts}/${createdEntity1.id}`)
  //     .send(data)
  //     .expect(HttpStatus.BadRequest);

  //   await request(app)
  //     .get(`${RouterPath.posts}/${createdEntity1.id}`)
  //     .expect(HttpStatus.Ok, createdEntity1);
  // });

  // it("shouldn't update entity with incorrect title length more than 40", async () => {
  //   const data: UpdateVideoModel = {
  //     title: "videovideovideovideovideovideovideovideovideovideo",
  //     author: "New Author",
  //     canBeDownloaded: true,
  //     minAgeRestriction: 12,
  //     publicationDate: new Date().toISOString(),
  //     availableResolutions: [VideoResolutions.P1080, VideoResolutions.P1440],
  //   };

  //   await request(app)
  //     .put(`${RouterPath.posts}/${createdEntity1.id}`)
  //     .send(data)
  //     .expect(HttpStatus.BadRequest);

  //   await request(app)
  //     .get(`${RouterPath.posts}/${createdEntity1.id}`)
  //     .expect(HttpStatus.Ok, createdEntity1);
  // });

  // it("shouldn't update entity with incorrect author length less than 1", async () => {
  //   const data: UpdateVideoModel = {
  //     title: "video",
  //     author: "",
  //     canBeDownloaded: true,
  //     minAgeRestriction: 12,
  //     publicationDate: new Date().toISOString(),
  //     availableResolutions: [VideoResolutions.P1080, VideoResolutions.P1440],
  //   };

  //   await request(app)
  //     .put(`${RouterPath.posts}/${createdEntity1.id}`)
  //     .send(data)
  //     .expect(HttpStatus.BadRequest);

  //   await request(app)
  //     .get(`${RouterPath.posts}/${createdEntity1.id}`)
  //     .expect(HttpStatus.Ok, createdEntity1);
  // });

  // it("shouldn't update entity with incorrect author length more than 20", async () => {
  //   const data: UpdateVideoModel = {
  //     title: "video",
  //     author: "AuthorAuthorAuthorAuthor",
  //     canBeDownloaded: true,
  //     minAgeRestriction: 12,
  //     publicationDate: new Date().toISOString(),
  //     availableResolutions: [VideoResolutions.P1080, VideoResolutions.P1440],
  //   };

  //   await request(app)
  //     .put(`${RouterPath.posts}/${createdEntity1.id}`)
  //     .send(data)
  //     .expect(HttpStatus.BadRequest);

  //   await request(app)
  //     .get(`${RouterPath.posts}/${createdEntity1.id}`)
  //     .expect(HttpStatus.Ok, createdEntity1);
  // });

  // it("shouldn't update entity with incorrect minAgeRestriction less than 1", async () => {
  //   const data: UpdateVideoModel = {
  //     title: "video",
  //     author: "Author",
  //     canBeDownloaded: true,
  //     minAgeRestriction: 0,
  //     publicationDate: new Date().toISOString(),
  //     availableResolutions: [VideoResolutions.P1080, VideoResolutions.P1440],
  //   };

  //   await request(app)
  //     .put(`${RouterPath.posts}/${createdEntity1.id}`)
  //     .send(data)
  //     .expect(HttpStatus.BadRequest);

  //   await request(app)
  //     .get(`${RouterPath.posts}/${createdEntity1.id}`)
  //     .expect(HttpStatus.Ok, createdEntity1);
  // });

  // it("shouldn't update entity with incorrect minAgeRestriction more than 18", async () => {
  //   const data: UpdateVideoModel = {
  //     title: "video",
  //     author: "Author",
  //     canBeDownloaded: true,
  //     minAgeRestriction: 20,
  //     publicationDate: new Date().toISOString(),
  //     availableResolutions: [VideoResolutions.P1080, VideoResolutions.P1440],
  //   };

  //   await request(app)
  //     .put(`${RouterPath.posts}/${createdEntity1.id}`)
  //     .send(data)
  //     .expect(HttpStatus.BadRequest);

  //   await request(app)
  //     .get(`${RouterPath.posts}/${createdEntity1.id}`)
  //     .expect(HttpStatus.Ok, createdEntity1);
  // });

  // it("shouldn't update entity with incorrect publicationDate", async () => {
  //   const data: UpdateVideoModel = {
  //     title: "video",
  //     author: "Author",
  //     canBeDownloaded: true,
  //     minAgeRestriction: 15,
  //     publicationDate: "dfsdf",
  //     availableResolutions: [VideoResolutions.P1080, VideoResolutions.P1440],
  //   };

  //   await request(app)
  //     .put(`${RouterPath.posts}/${createdEntity1.id}`)
  //     .send(data)
  //     .expect(HttpStatus.BadRequest);

  //   await request(app)
  //     .get(`${RouterPath.posts}/${createdEntity1.id}`)
  //     .expect(HttpStatus.Ok, createdEntity1);
  // });

  // it("shouldn't update entity with incorrect availableResolutions length less than 1", async () => {
  //   const data: UpdateVideoModel = {
  //     title: "video",
  //     author: "Author",
  //     canBeDownloaded: true,
  //     minAgeRestriction: 15,
  //     publicationDate: new Date().toISOString(),
  //     availableResolutions: [],
  //   };

  //   await request(app)
  //     .put(`${RouterPath.posts}/${createdEntity1.id}`)
  //     .send(data)
  //     .expect(HttpStatus.BadRequest);

  //   await request(app)
  //     .get(`${RouterPath.posts}/${createdEntity1.id}`)
  //     .expect(HttpStatus.Ok, createdEntity1);
  // });

  // it("shouldn't update entity that not exist", async () => {
  //   const data: UpdateVideoModel = {
  //     title: "Title",
  //     author: "New Author",
  //     canBeDownloaded: true,
  //     minAgeRestriction: 12,
  //     publicationDate: new Date().toISOString(),
  //     availableResolutions: [VideoResolutions.P1080, VideoResolutions.P1440],
  //   };
  //   await request(app)
  //     .put(`${RouterPath.posts}/123`)
  //     .send(data)
  //     .expect(HttpStatus.NotFound);
  // });

  // it("should update entity with correct input data", async () => {
  //   const data: UpdateVideoModel = {
  //     title: "Title",
  //     author: "New Author",
  //     canBeDownloaded: true,
  //     minAgeRestriction: 12,
  //     publicationDate: new Date().toISOString(),
  //     availableResolutions: [VideoResolutions.P1080, VideoResolutions.P1440],
  //   };
  //   await request(app)
  //     .put(`${RouterPath.posts}/${createdEntity1.id}`)
  //     .send(data)
  //     .expect(HttpStatus.NoContent);

  //   await request(app)
  //     .get(`${RouterPath.posts}/${createdEntity1.id}`)
  //     .expect(HttpStatus.Ok, { ...createdEntity1, ...data });

  //   await request(app)
  //     .get(`${RouterPath.posts}/${createdEntity2.id}`)
  //     .expect(HttpStatus.Ok, createdEntity2);
  // });

  // it("should delete entity", async () => {
  //   await request(app)
  //     .delete(`${RouterPath.posts}/${createdEntity1.id}`)
  //     .expect(HttpStatus.NoContent);

  //   await request(app)
  //     .get(`${RouterPath.posts}/${createdEntity1.id}`)
  //     .expect(HttpStatus.NotFound);

  //   await request(app)
  //     .get(`${RouterPath.posts}/${createdEntity2.id}`)
  //     .expect(HttpStatus.Ok, createdEntity2);

  //   await request(app)
  //     .delete(`${RouterPath.posts}/${createdEntity2.id}`)
  //     .expect(HttpStatus.NoContent);

  //   await request(app)
  //     .get(`${RouterPath.posts}/${createdEntity2.id}`)
  //     .expect(HttpStatus.NotFound);

  //   await request(app).get(RouterPath.posts).expect(HttpStatus.Ok, []);
  // });
});
