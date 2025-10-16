import type { Request, Response } from "express";
import type { BlogEntry } from "../../types/models";
import { updateEntry } from "../../models/blogEntriesModel";
import { sanitizeObject } from "../../utils/sanitizeObject";

export default async function updateController (req: Request, res: Response):Promise<void>  {
  const id = req.params.id
    const formData = req.body
    formData.id = id
    const sanitized = sanitizeObject(formData) as BlogEntry
    await updateEntry(sanitized);
  res.redirect("/admin");
};
