import type { Request, Response } from "express";
import { getBlogEntries } from "../../models/blogEntriesModel";

export default async function updatePageController (req: Request, res: Response):Promise<void>  {
    const entryData = await getBlogEntries();
    const id = req.params.id
    const entry = entryData.find(item => item.id === id)
  res.render("../views/admin/updatePage.html", {
    title: "Admin Page",
    entry,
  });
};
