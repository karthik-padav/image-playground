import mongoose, { Mongoose } from "mongoose";

const MONGOOSE_URL = process.env.MONGO_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;
  if (!MONGOOSE_URL) throw new Error("Missing MONGOOSE_URL");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGOOSE_URL, {
      dbName: "imagePlayground",
      bufferCommands: false,
    });
  cached.conn = await cached.promise;
  return cached.conn;
};
