import * as sqlite3 from "sqlite3";
import path from "path";

const sqlite = sqlite3.verbose();
const DB_FILE = path.join(__dirname, "../../blog.db");
let db: sqlite3.Database | null = null;

export function connectDB(): Promise<sqlite3.Database> {
  return new Promise((resolve, reject) => {
    db = new sqlite.Database(
      DB_FILE,
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      (err: Error | null) => {
        if (err) {
          console.error("Failed to connect to database:", err.message);
          return reject(err);
        }

        console.log("Connected to the SQLite database.");

        const createTableSQL = `CREATE TABLE IF NOT EXISTS blog_entries (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          image TEXT,
          author TEXT,
          createdAt INTEGER,
          teaser TEXT,
          content TEXT
        );`;

        db!.run(createTableSQL, (createErr: Error | null) => {
          if (createErr) {
            console.error("Failed to create table:", createErr.message);
            return reject(createErr);
          }

          console.log("Blog entries table checked/created successfully.");
          return resolve(db as sqlite3.Database);
        });
      }
    );
  });
}

export function getDB(): sqlite3.Database {
  if (!db) {
    throw new Error("Database not initialized");
  }
  return db;
}       

export function closeDB(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (db) {
      db.close((err: Error | null) => {
        if (err) {
          console.error("Failed to close the database:", err.message);
          return reject(err);
        }
        console.log("Database connection closed.");
        resolve();
      });
    } else {
      resolve();
    }
  });
}

process.on("SIGINT", async () => {
  console.log("SIGINT received. Closing database connection...");
  await closeDB();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received. Closing database connection...");
  await closeDB();
  process.exit(0);
});