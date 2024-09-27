import mongoose, { Mongoose } from "mongoose";


const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose

if(!cached) {
    cached = (global as any).mongoose = {
        conn: null, promise: null
    }
}

export const connectToDatabase = async () => {
    if (cached.conn) {
      console.log("Using cached connection");
      return cached.conn;
    }
  
    if (!MONGODB_URL) throw new Error("Missing MONGODB_URL");
  
    try {
      cached.promise =
        cached.promise ||
        mongoose.connect(MONGODB_URL, {
          dbName: "Imaginify",
          bufferCommands: false,
        });
      cached.conn = await cached.promise;
      console.log("Successfully connected to MongoDB");
      return cached.conn;
    } catch (error) {
      // Type assertion to handle error as an instance of Error
    if (error instanceof Error) {
      console.error("Error connecting to MongoDB:", error.message, error.stack);
    } else {
      console.error("Unexpected error connecting to MongoDB:", error);
    }
    throw new Error("MongoDB connection failed");
  }
    }


  