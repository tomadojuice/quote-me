#!/usr/bin/env node

import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { join } from "path";
import { homedir } from "os";
import { mkdirSync, existsSync, writeFileSync, readFileSync } from "fs";
import { v4 as uuidv4 } from "uuid";
import { Command } from "commander";
import { startWebServer } from "./web/server.js";

/**
 * Returns the path to the application's data directory based on the current operating system.
 *
 * - On Windows, uses `%APPDATA%\quotes` or falls back to `<home>\AppData\Roaming\quotes`.
 * - On macOS, uses `<home>/Library/Application Support/quotes`.
 * - On Linux, uses `$XDG_DATA_HOME/quotes` or falls back to `<home>/.local/share/quotes`.
 *
 * @returns {string} The absolute path to the application's data directory.
 */
function getDataDir() {
  const home = homedir();

  switch (process.platform) {
    case "win32":
      return join(
        process.env.APPDATA || join(home, "AppData", "Roaming"),
        "quotes"
      );
    case "darwin":
      return join(home, "Library", "Application Support", "quotes");
    case "linux":
    default:
      return join(
        process.env.XDG_DATA_HOME || join(home, ".local", "share"),
        "quotes"
      );
  }
}

/**
 * Ensures the data directory exists, creating it if necessary.
 * @param {string} dataDir - The path to the data directory
 */
function ensureDataDirectory(dataDir) {
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }
}

/**
 * Initializes and returns a lowdb database instance.
 * @param {string} dataDir - The path to the data directory
 * @returns {Promise<Low>} The initialized database instance
 */
async function initializeDatabase(dataDir) {
  const adapter = new JSONFile(join(dataDir, "quotes.json"));
  const db = new Low(adapter, { quotes: [] });
  await db.read();
  return db;
}

/**
 * Saves a quote to the database.
 * @param {Low} db - The database instance
 * @param {string} quote - The quote text
 * @param {string} author - The quote author
 */
async function saveQuote(db, quote, author) {
  db.data.quotes.push({
    id: uuidv4(),
    quote: quote,
    author: author,
    createdAt: new Date().toISOString(),
  });

  await db.write();
  console.log(`Quote saved: "${quote}" - ${author}`);
}

/**
 * Deletes a quote by ID from the database.
 * @param {Low} db - The database instance
 * @param {string} id - The quote ID to delete
 */
async function deleteQuote(db, id) {
  const initialLength = db.data.quotes.length;
  db.data.quotes = db.data.quotes.filter((q) => q.id !== id);

  if (db.data.quotes.length < initialLength) {
    await db.write();
    console.log(`Quote with ID ${id} deleted.`);
  } else {
    console.log(`No quote found with ID ${id}.`);
  }
}

/**
 * Lists all quotes in the database.
 * @param {Low} db - The database instance
 */
async function listQuotes(db) {
  if (db.data.quotes.length === 0) {
    console.log("No quotes found.");
    return;
  }

  db.data.quotes.forEach(({ id, quote, author, createdAt }) => {
    console.log(`[${id}] "${quote}" - ${author} (added on ${createdAt})`);
  });
}

/**
 * Saves database to JSON file in current directory.
 *
 * @async
 * @param {Low} db - The database instance
 */
async function saveJson(db) {
  const outputPath = join(process.cwd(), "quotes.json");
  const jsonData = JSON.stringify(db.data, null, 2);

  writeFileSync(outputPath, jsonData, "utf8");
  console.log(`Database exported to: ${outputPath}`);
}

/**
 * Imports quotes from a JSON file and adds them to the database.
 * Skips quotes with duplicate UUIDs to prevent duplicates.
 *
 * @async
 * @param {object} db - The database object with a `data.quotes` array and a `write` method.
 * @param {string} file - The path to the JSON file containing quotes.
 * @returns {Promise<void>} Resolves when the quotes have been imported and the database has been written.
 * @throws Will log an error if the file cannot be read, parsed, or if the format is invalid.
 */
async function importQuotes(db, file) {
  try {
    const data = JSON.parse(readFileSync(file, "utf8"));
    if (Array.isArray(data.quotes)) {
      const existingIds = new Set(db.data.quotes.map((quote) => quote.id));

      const newQuotes = data.quotes.filter((quote) => {
        return !existingIds.has(quote.id);
      });

      db.data.quotes.push(...newQuotes);
      await db.write();

      const skippedCount = data.quotes.length - newQuotes.length;
      console.log(`Imported ${newQuotes.length} quotes from ${file}`);
      if (skippedCount > 0) {
        console.log(`Skipped ${skippedCount} duplicate quotes (based on UUID)`);
      }
    } else {
      console.error("Invalid file format: 'quotes' should be an array.");
    }
  } catch (error) {
    console.error(`Failed to import quotes from ${file}:`, error.message);
  }
}

/**
 * Main application function.
 */
async function main() {
  const program = new Command();

  const dataDir = getDataDir();
  ensureDataDirectory(dataDir);
  const db = await initializeDatabase(dataDir);

  program
    .name("quote-me")
    .description(
      "A simple CLI tool for managing and storing your favorite quotes"
    );

  program
    .command("add")
    .alias("a")
    .description("Add a new quote")
    .argument("<quote>", "The quote text")
    .argument("<author>", "The quote author")
    .action(async (quote, author) => {
      await saveQuote(db, quote, author);
    });

  program
    .command("list")
    .alias("l")
    .description("List all saved quotes")
    .action(async () => {
      await listQuotes(db);
    });

  program
    .command("delete")
    .alias("d")
    .description("Delete a quote by ID")
    .argument("<id>", "The quote ID to delete")
    .action(async (id) => {
      await deleteQuote(db, id);
    });

  program
    .command("export")
    .description("Export quotes to quotes.json in current directory")
    .action(async () => {
      await saveJson(db);
    });

  program
    .command("import")
    .description("Import quotes from file")
    .argument("<file>", "Path to JSON file")
    .action(async (file) => {
      await importQuotes(db, file);
    });

  program
    .command("web")
    .description("Start the web interface")
    .action(async () => {
      await startWebServer(db.data);
    });

  await program.parseAsync();
}

main().catch(console.error);
