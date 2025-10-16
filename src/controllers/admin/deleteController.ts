import type { Request, Response } from "express";
import { deleteEntry } from "../../models/blogEntriesModel";

export default async function deleteController (req: Request, res: Response):Promise<void>  {
    const id = req.params.id
    console.log("api abfrage eingegangen für delete von: " + id)
await deleteEntry(id);
  res.redirect("/admin");
};
