import { Collection, Db, MongoClient } from "mongodb";
import { BlogDb } from "../features/blogs/types/blogs.db.type";
import { PostDb } from "../features/posts/types/posts.db.type";
import config from "../core/settings/config";

export let client: MongoClient;
export let blogsCollection: Collection<BlogDb>;
export let postsCollection: Collection<PostDb>;

export async function runDB(url: string) {
  client = new MongoClient(url);
  const db: Db = client.db(config.dbName);

  blogsCollection = db.collection<BlogDb>(config.blogCollectionName);
  postsCollection = db.collection<PostDb>(config.postCollectionName);

  try {
    await client.connect();
    await db.command({ ping: 1 });
    console.log("✅ Connected to the database");
  } catch (error) {
    await client.close();
    throw new Error(`❌ Database not connected: ${error}`);
  }
}

export async function closeDB() {
  try {
    await client.close();
    console.log("✅ Database connection closed");
  } catch (error) {
    console.error("❌ Error closing database:", error);
  }
}
