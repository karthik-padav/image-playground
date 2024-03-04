import mongoose, { Mongoose } from "mongoose";

const MONGOOSE_URL =
  process.env.MONGO_URL ||
  "mongodb+srv://ka19developer:vNEBe3pcRFtFTjK8@cluster0.1nwwy7i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
