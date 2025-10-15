import { readFile } from "node:fs/promises";
import * as path from "node:path";
import type { BlogEntries, BlogEntry } from "../types/models";
import { randomUUID } from "node:crypto";
import { createFile } from "../utils/fsCrudOperators";
const FILE_PATH = path.join(__dirname, "../data/entries.json");

export async function getBlogEntries(): Promise<BlogEntries> {
  console.log("Reading blog entries from:", FILE_PATH);
  try {
    const blogEntries = await readFile(FILE_PATH, "utf-8");

    if (blogEntries.length === 0) {
      return [];
    } else {
      return JSON.parse(blogEntries);
    }
  } catch (error) {
    return [];
  }
}

export async function createEntry(data: BlogEntry): Promise<boolean> {
  try {
    const oldEntries = await getBlogEntries();
    data.id = randomUUID();
    oldEntries.push(data)
    const newJsonData = JSON.stringify(oldEntries, null, 2);
    await createFile(FILE_PATH, newJsonData);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
export async function updateEntry(data: BlogEntry): Promise<boolean> {
  try {
    if (!data.id) {
      throw new Error(
        `Warnung! Bei der Funktion "updateEntry" wurde keine ID mitgegeben`
      );
    }
    const allBlogEntries = await getBlogEntries();
    const index = allBlogEntries.findIndex((item) => item.id === data.id);
    if (index === -1) {
      throw new Error(`Warnung! Kein Eintrag mit der id ${data.id} gefunden!`);
    }
    allBlogEntries[index] = { ...data };
    const newJsonEntries = JSON.stringify(allBlogEntries, null, 2);
    await createFile(FILE_PATH, newJsonEntries);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function deleteEntry(id: string): Promise<boolean> {
  try {
    const allBlogEntries = await getBlogEntries();
    const index = allBlogEntries.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error(`Warnung! Kein Eintrag mit der id ${id} gefunden!`);
    }
    allBlogEntries.splice(index, 1);
    const newJsonEntries = JSON.stringify(allBlogEntries, null, 2);
    await createFile(FILE_PATH, newJsonEntries);
    return true
  } 
  catch (error) {
    console.error(error);
    return false;
  }
}
