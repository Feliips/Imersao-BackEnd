import { MongoClient } from "mongodb";

export default async function connectToDatabase(connectionString) {
  let mongoClient;

  try {
    mongoClient = new MongoClient(connectionString);
    console.log("Connecting to database cluster...");
    await mongoClient.connect();
    console.log("Successfully connected to MongoDB Atlas!");

    return mongoClient;
  } catch (error) {
    console.error("Database connection failed!", error);
    process.exit();
  }
}
