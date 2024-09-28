import mongoose, { Mongoose } from 'mongoose';

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
  if(cached.conn) return cached.conn;

  if(!MONGODB_URL) throw new Error('Missing MONGODB_URL');

  // Add timeout and other connection options here
  const options = {
    dbName: 'imaginify',
    bufferCommands: false,
    useNewUrlParser: true,         // Use the new MongoDB connection string parser
    useUnifiedTopology: true,      // Use the new server discovery and monitoring engine
    serverSelectionTimeoutMS: 5000 // Timeout after 5 seconds
  };

  cached.promise = 
    cached.promise || 
    mongoose.connect(MONGODB_URL, options)

  cached.conn = await cached.promise;

  mongoose.set('debug', true); // This will enable detailed logging

  return cached.conn;
}