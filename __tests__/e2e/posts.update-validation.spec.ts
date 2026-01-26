import { Express } from "express";
import request from "supertest";
import { HttpStatus } from "../../src/core/types/http-statuses";
import { postsTestManager } from "./utils/PostsTestManager";
import { PostInputModel } from "../../src/features/posts/models/PostInputModel";
import { PostViewModel } from "../../src/features/posts/models/PostViewModel";
import { RouterPath } from "../../src/core/constants";
import { blogsTestManager } from "./utils/BlogsTestManager";
import { BlogInputModel } from "../../src/features/blogs/models/BlogInputModel";
import { BlogViewModel } from "../../src/features/blogs/models/BlogViewModel";

describe("tests for /posts", () => {
  let app: Express;
  let createdEntity1: PostViewModel | null = null;
  let createdEntity2: PostViewModel | null = null;
  let createdBlog: BlogViewModel;
  const adminToken = postsTestManager.adminToken;

  beforeAll(async () => {
    app = await postsTestManager.initApp();
    await request(app).delete(`${RouterPath.testing}/all-data`);

    const blogData: BlogInputModel = {
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

  it("should create entity with correct data", async () => {
    const data: PostInputModel = {
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
    const data: PostInputModel = {
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
