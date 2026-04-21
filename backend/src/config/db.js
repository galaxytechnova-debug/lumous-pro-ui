const mongoose = require("mongoose");

let cachedConnectionPromise = null;

function resolveMongoUri(explicitMongoUri) {
  return explicitMongoUri || process.env.MONGODB_URI;
}

async function connectToDatabase(explicitMongoUri) {
  const mongoUri = resolveMongoUri(explicitMongoUri);
  if (!mongoUri) {
    throw new Error("Missing MONGODB_URI.");
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!cachedConnectionPromise) {
    mongoose.set("strictQuery", true);
    const serverSelectionTimeoutMs = Number(process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS) || 5000;
    cachedConnectionPromise = mongoose.connect(mongoUri, {
      autoIndex: process.env.NODE_ENV !== "production",
      serverSelectionTimeoutMS: serverSelectionTimeoutMs,
      connectTimeoutMS: Number(process.env.MONGODB_CONNECT_TIMEOUT_MS) || 10000,
      socketTimeoutMS: Number(process.env.MONGODB_SOCKET_TIMEOUT_MS) || 20000,
    });
  }

  try {
    await cachedConnectionPromise;
    return mongoose.connection;
  } catch (error) {
    cachedConnectionPromise = null;
    throw error;
  }
}

function getDatabaseHealth() {
  return {
    connected: mongoose.connection.readyState === 1,
    readyState: mongoose.connection.readyState,
  };
}

module.exports = { connectToDatabase, getDatabaseHealth };
