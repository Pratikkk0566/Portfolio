import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

// Use in-memory database URL for development if DATABASE_URL is not set
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://localhost:5432/portfolio";

if (!process.env.DATABASE_URL) {
  console.warn("⚠️  DATABASE_URL not set. Using default: " + DATABASE_URL);
  console.warn("⚠️  The app may not work properly without a real database.");
  console.warn("⚠️  For now, the server will start but database operations will fail.");
}

export const pool = new Pool({ connectionString: DATABASE_URL });
export const db = drizzle(pool, { schema });
