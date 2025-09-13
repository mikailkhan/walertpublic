import { drizzle } from "drizzle-orm/node-postgres";
import { DATABASE_URL } from "../configs/config";
import { sql } from "drizzle-orm";

export const db = drizzle({ connection: DATABASE_URL! });

// Test connection
export const testDBConnection = async () => {
  try {
    await db.execute(sql`SELECT 1`);
    console.log("✅ Database connection successful");
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
};
