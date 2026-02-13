import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { env } from "$env/dynamic/private";
import path from "path";
import { fileURLToPath } from "url";
import * as schema from "./db/schema";

// Get project root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(process.cwd(), "sqlite.db");

// Create SQLite database connection
const sqlite = new Database(dbPath);
sqlite.pragma("journal_mode = WAL"); // Better performance

// Create Drizzle client with schema typing
export const db = drizzle(sqlite, { schema });

export default db;
