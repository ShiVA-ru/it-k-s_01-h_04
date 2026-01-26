export const SETTINGS = {
  PORT: process.env.PORT || 5001,
  MONGO_URL:
    process.env.MONGO_URL ||
    "mongodb+srv://shivladimiralex_db_user:MVh58qAV6Lul1DqJ@cluster0.yvxrc0t.mongodb.net/?appName=Cluster0",
  DB_NAME: process.env.DB_NAME || "my_database",
  BLOG_COLLECTION_NAME: process.env.BLOG_COLLECTION_NAME || "blogs",
  POST_COLLECTION_NAME: process.env.POST_COLLECTION_NAME || "posts",
};
