import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

const MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = MongooseCache;
}

async function connectDB(): Promise<typeof mongoose> {
  if (MongooseCache.conn) {
    return MongooseCache.conn;
  }

  if (!MongooseCache.promise) {
    const opts = {
      bufferCommands: false,
    };

    MongooseCache.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    MongooseCache.conn = await MongooseCache.promise;
  } catch (e) {
    MongooseCache.promise = null;
    throw e;
  }

  return MongooseCache.conn;
}

export default connectDB;