import { Db, MongoClient } from "mongodb";

let uri = process.env.CONNECTIONSTRING as string;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  const client = await MongoClient.connect(uri);
  const db = await client.db("");

  cachedDb = db;
  return db;
}

export enum COLLECTIONS {
  POSTS = "posts",
  FOLLOWS = "follows",
  USERs = "users",
}
