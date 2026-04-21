const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const waitlistRoutes = require("./routes/waitlist.routes");
const { getDatabaseHealth } = require("./config/db");
const { notFoundHandler, errorHandler } = require("./middlewares/error-handler");

const app = express();

function resolveCorsOrigins() {
  const fromEnv = (process.env.FRONTEND_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  return fromEnv.length > 0 ? fromEnv : ["http://localhost:3000"];
}

const allowedOrigins = resolveCorsOrigins();

app.use(helmet());
app.use(compression());
app.set("trust proxy", 1);
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Origin not allowed by CORS policy."));
    },
    methods: ["GET", "POST", "OPTIONS"],
    optionsSuccessStatus: 204,
  })
);
app.use(express.json({ limit: "10kb" }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.get("/", (req, res) => {
  res.status(200).json({
    ok: true,
    service: "waitlist-api",
    message: "API is running.",
    health: "/health",
  });
});

app.get("/favicon.ico", (req, res) => {
  // API deployment does not need a favicon asset.
  res.status(204).end();
});

app.get("/health", (req, res) => {
  const dbHealth = getDatabaseHealth();
  const ok = dbHealth.connected;

  res.status(ok ? 200 : 503).json({
    ok,
    service: "waitlist-api",
    db: dbHealth,
  });
});

const waitlistLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use("/api/v1/waitlist", waitlistLimiter, waitlistRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
