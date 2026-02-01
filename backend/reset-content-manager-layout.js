const path = require("path");
const fs = require("fs");

const client = process.env.DATABASE_CLIENT || "sqlite";
if (client !== "sqlite") {
  console.error(`This script only supports sqlite. Current DATABASE_CLIENT=${client}`);
  process.exit(1);
}

const filename = process.env.DATABASE_FILENAME || ".tmp/data.db";
const dbPath = path.isAbsolute(filename) ? filename : path.join(__dirname, filename);

if (!fs.existsSync(dbPath)) {
  console.error(`Database file not found: ${dbPath}`);
  process.exit(1);
}

const Database = require("better-sqlite3");
const db = new Database(dbPath);

const tables = db
  .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name LIKE '%core_store%'")
  .all()
  .map((row) => row.name);

if (tables.length === 0) {
  console.error("No core store table found.");
  process.exit(1);
}

const tableName = tables[0];
const likeMainPage = "%main-page%";
const likeContentManager = "%content_manager%";
const likeContentManagerDash = "%content-manager%";

const rows = db
  .prepare(
    `SELECT id, key FROM "${tableName}" WHERE (key LIKE ? OR key LIKE ?) AND key LIKE ?`
  )
  .all(likeContentManager, likeContentManagerDash, likeMainPage);

if (rows.length === 0) {
  console.log("No matching content-manager layout records found for main-page.");
  process.exit(0);
}

const dryRun = process.argv.includes("--dry");
console.log("Found layout records:", rows.map((r) => r.key));

if (dryRun) {
  console.log("Dry run only. Use without --dry to delete.");
  process.exit(0);
}

const del = db.prepare(`DELETE FROM "${tableName}" WHERE id = ?`);
const tx = db.transaction((items) => {
  for (const item of items) del.run(item.id);
});
tx(rows);

console.log(`Deleted ${rows.length} layout record(s) from ${tableName}.`);
