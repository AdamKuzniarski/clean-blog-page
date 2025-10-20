import { getDB } from '../db/database';
import type { BlogEntries, BlogEntry } from '../types/models';

// get by id 
// create
// update
// delete 


export async function getBlogEntries(): Promise<BlogEntries> {
  const db = getDB();
  return new Promise((resolve, reject) => {
    db.all<BlogEntry>(
      `SELECT *, authors.name AS author FROM blog_entries JOIN authors ON blog_entries.author_id = authors.id`,
      [],
      (error: Error | null, rowData: BlogEntries) => {
        if (error) {
          reject(error);
        } else {
          resolve(rowData);
        }
      }
    );
  });
}

export async function getBlogEntryById(id: number): Promise<BlogEntry> {
  const db = getDB();
  return new Promise((resolve, reject) => {
    db.get<BlogEntry>(
      `SELECT *, authors.name AS author FROM blog_entries JOIN authors ON blog_entries.author_id = authors.id WHERE blog_entries.id = ?`,
      [id],
      (error: Error | null, rowData: BlogEntry) => {
        if (error) {
          reject(error);
        } else {
          resolve(rowData);
        }
      }
    );
  });
}

