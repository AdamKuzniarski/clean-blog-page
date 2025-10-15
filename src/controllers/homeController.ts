import type { Request, Response } from "express";
import { getBlogEntries } from "../models/blogEntriesModel";

export async function homeController (req: Request, res: Response) {
  const entryData = await getBlogEntries();
  res.render("index.html", {
    title: "Home Page",
    entryData,
  });
};
