import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

// Check if the global variable is already defined
if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

export async function connectToDB() {
  // If a connection is already established, return it
  if (cached.conn) {
    return cached.conn;
  }
  // If a connection is in progress, wait for it to resolve
  if (!cached.promise) {
    const opts = {
        
    };
    mongoose.connect(MONGODB_URI, opts).then(() => mongoose.connection);
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null; // Reset the promise on error
    throw error;

    return cached.conn;
  }
}
