import { MongoClient } from 'mongodb';

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
  const dbName = process.env.MONGODB_DB || 'govhealth';

  try {
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    await client.connect();
    const db = client.db(dbName);

    cachedClient = client;
    cachedDb = db;
    return { client, db };
  } catch (err) {
    cachedClient = null;
    cachedDb = null;
    console.error('MongoDB Connection Error:', err.message);
    throw err;
  }
}