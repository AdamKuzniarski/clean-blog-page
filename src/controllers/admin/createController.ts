import type { Request, Response } from "express";
import type { BlogEntry } from "../../types/models";
import { createEntry } from "../../models/blogEntriesModel";
import { sanitizeObject } from "../../utils/sanitizeObject";


export default async function createController(req: Request, res: Response) {
  const { id, title, author, teaser, content } = req.body;
  const image = req.file ? `${req.file.filename}` : "";
  const createdAt = Math.floor(Date.now() / 1000);


  const newEntry: BlogEntry = {
    id,
    title,
    author,
    teaser,
    content,
    image,
    createdAt,
  };

  const sanitized = sanitizeObject(newEntry) as BlogEntry;
  await createEntry(sanitized);

  res.redirect("/admin");
}
