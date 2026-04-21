const dotenv = require("dotenv");
const app = require("../src/app");
const { connectToDatabase } = require("../src/config/db");

dotenv.config({ quiet: true });

function getPathname(req) {
  const rawUrl = req?.url || "/";
  return rawUrl.split("?")[0];
}

function shouldConnectForRequest(pathname) {
  return pathname === "/health" || pathname.startsWith("/api/v1/waitlist") || pathname.startsWith("/api/v1/templates");
}

module.exports = async function handler(req, res) {
  const pathname = getPathname(req);

  try {
    if (shouldConnectForRequest(pathname)) {
      try {
        await connectToDatabase();
      } catch (error) {
        if (pathname !== "/health") {
          throw error;
        }
      }
    }

    return app(req, res);
  } catch (error) {
    console.error("Failed to handle request:", error);

    if (error?.name === "MongoServerSelectionError") {
      return res.status(503).json({
        ok: false,
        message: "Database is temporarily unavailable.",
      });
    }

    return res.status(500).json({
      ok: false,
      message: "Internal server error.",
    });
  }
};
