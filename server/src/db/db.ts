import { drizzle } from "drizzle-orm/node-postgres";
import { DATABASE_URL } from "../configs/config";

export const db = drizzle({ connection: DATABASE_URL! });
