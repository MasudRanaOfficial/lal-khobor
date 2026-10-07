import { MongoClient, Db } from "mongodb";

if (!process.env.MONGODB_URL) {
  throw new Error("MONGODB_URL is not defined in environment variables");
}

const uri = process.env.MONGODB_URL;

let client: MongoClient;

declare global {
  var _mongoClient: MongoClient | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(uri);
  }
  client = global._mongoClient;
} else {
  client = new MongoClient(uri);
}

const db: Db = client.db("lal-khobor");

export { client, db };
