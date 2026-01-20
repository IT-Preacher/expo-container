import * as SQLite from "expo-sqlite";

const DATABASE_NAME = "app-kv-store.db";
const TABLE_NAME = "kv_store";

let dbInstance: SQLite.SQLiteDatabase | null = null;

async function getDb() {
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync(DATABASE_NAME);

    await dbInstance.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
        key TEXT PRIMARY KEY NOT NULL,
        value TEXT
      );
    `);
  }
  return dbInstance;
}

export const AsyncKvStore = {
  async setItem(key: string, value: string): Promise<void> {
    const db = await getDb();

    await db.runAsync(
      `INSERT OR REPLACE INTO ${TABLE_NAME} (key, value) VALUES (?, ?);`,
      key,
      value,
    );
  },

  async getItem(key: string): Promise<string | null> {
    const db = await getDb();

    const result = await db.getFirstAsync<{ value: string }>(
      `SELECT value FROM ${TABLE_NAME} WHERE key = ?;`,
      key,
    );

    return result?.value ?? null;
  },

  async removeItem(key: string): Promise<void> {
    const db = await getDb();

    await db.runAsync(`DELETE FROM ${TABLE_NAME} WHERE key = ?;`, key);
  },
};
