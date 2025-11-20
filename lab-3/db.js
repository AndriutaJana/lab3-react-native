import { openDatabaseSync } from "expo-sqlite";

const db = openDatabaseSync("recipes.db");

// Creează tabela dacă nu există
export async function initDb() {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      ingredients TEXT,
      instructions TEXT,
      image TEXT
    );
  `);
}

// Adaugă o rețetă nouă
export async function addRecipe(title, ingredients, instructions, image) {
  await db.runAsync(
    "INSERT INTO recipes (title, ingredients, instructions, image) VALUES (?, ?, ?, ?)",
    [title, ingredients, instructions, image]
  );
}

// Ia toate rețetele
export async function getAllRecipes() {
  const result = await db.getAllAsync("SELECT * FROM recipes");
  return result; // întoarce un array
}

export default db;
