import { Collection, Db, MongoClient } from "mongodb";
import { BlogDbModel } from "../features/blogs/models/BlogDbModel";
import { PostDbModel } from "../features/posts/models/PostDbModel";
import config from "../core/settings/config";

export let client: MongoClient;
export let blogsCollection: Collection<BlogDbModel>;
export let postsCollection: Collection<PostDbModel>;

export async function runDB(url: string) {
  client = new MongoClient(url);
  const db: Db = client.db(config.dbName);

  blogsCollection = db.collection<BlogDbModel>(config.blogCollectionName);
  postsCollection = db.collection<PostDbModel>(config.postCollectionName);

  try {
    await client.connect();
    await db.command({ ping: 1 });
    console.log("✅ Connected to the database");
  } catch (error) {
    await client.close();
    throw new Error(`❌ Database not connected: ${error}`);
  }
}

// export async function runDB(url: string): Promise<void> {
//   client = new MongoClient(url);
//   const db: Db = client.db(DBName);

//   //Инициализация коллекций
//   blogsCollection = db.collection<BlogMongoModel>(DBCollectionNames.BLOGS);
//   postsCollection = db.collection<PostMongoModel>(DBCollectionNames.POSTS);

//   try {
//     await client.connect();
//     await db.command({ ping: 1 });
//     console.log(`✅ Connected to the database ${db.databaseName}`);
//   } catch (e) {
//     await client.close();
//     throw new Error(`❌ Database not connected: ${e}`);
//   }
// }
//
// ssh -R 80:localhost:5001 serveo.net
// https://serveo.net/
// https://localhost.run/
// https://ngrok.com/
