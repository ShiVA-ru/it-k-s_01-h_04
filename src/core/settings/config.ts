import * as dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || "",
  mongoUrl: process.env.MONGO_URL || "",
  dbName: process.env.DB_NAME || "",
  blogCollectionName: process.env.BLOG_COLLECTION_NAME || "",
  postCollectionName: process.env.POST_COLLECTION_NAME || "",
  adminUsername: process.env.ADMIN_USERNAME || "",
  adminPassword: process.env.ADMIN_PASSWORD || "",
};

export default config;
