import { ObjectId } from "mongodb";
import connectToDatabase from "../config/dbConfig.js";

const connection = await connectToDatabase(process.env.MONGODB_URI);

export async function getAllPosts() {
  const db = connection.db("Imersão-BackEnd");
  const collection = db.collection("posts");
  return collection.find().toArray();
}

export async function createPost(newPost) {
  const db = connection.db("Imersão-BackEnd");
  const collection = db.collection("posts");
  return collection.insertOne(newPost);
}

export async function updatePost(id, newPost) {
  const db = connection.db("Imersão-BackEnd");
  const collection = db.collection("posts");
  const objectId = ObjectId.createFromHexString(id);
  return collection.updateOne(
    { _id: new ObjectId(objectId) },
    { $set: newPost }
  );
}
