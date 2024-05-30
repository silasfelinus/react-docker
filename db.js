import { Low, JSONFile } from "lowdb";
import { join } from "path";

// Use JSON file for storage
const file = join(process.cwd(), "db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);

// Initialize the database with defaults
db.data ||= { users: [], sessions: [], accounts: [] };

export default db;
