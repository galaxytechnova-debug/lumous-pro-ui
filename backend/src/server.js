const dotenv = require("dotenv");
const app = require("./app");
const { connectToDatabase } = require("./config/db");

dotenv.config({ quiet: true });

const PORT = Number(process.env.PORT) || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI. Add it in backend/.env.");
  process.exit(1);
}

async function bootstrap() {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Waitlist API running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

bootstrap();
