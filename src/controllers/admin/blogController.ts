import type { Request, Response } from "express";
import { getBlogEntries } from "../../models/blogEntriesModel";

export const entriesListing = async (req: Request, res: Response) => {
  const entryData = await getBlogEntries();
  res.render("../views/admin/indexPage.html", {
    title: "Admin Page",
    entryData,
  });
};
