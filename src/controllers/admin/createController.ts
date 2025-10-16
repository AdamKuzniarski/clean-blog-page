import type { Request, Response } from "express";
import type { BlogEntry } from "../../types/models";
import { createEntry } from "../../models/blogEntriesModel";
import { sanitizeObject } from "../../utils/sanitizeObject";

export default async function createController (req: Request, res: Response):Promise<void>  {
    const formData = req.body
    const sanitized = sanitizeObject(formData) as BlogEntry
    await createEntry(sanitized)
  res.redirect("/admin");
};

