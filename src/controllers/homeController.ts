import type { Request, Response } from "express";
import { getBlogEntries } from "../models/blogEntriesModel";
import { matches, toSearchText } from "../utils/search";

export async function homeController(req: Request, res: Response) {
  let entryData = await getBlogEntries();

  const searchParameter =
    (req.query.search as string | undefined)?.trim() ?? "";

  if (searchParameter.length > 0) {
    const searchTerms = searchParameter
      .split(/\s+/)
      .filter((word) => word.length > 0);

    entryData = entryData.filter((blogEntry) => {
      const searchableText = toSearchText(blogEntry);
      const hasMatch = searchTerms.some((singleTerm) =>
        matches(searchableText, singleTerm)
      );
      return hasMatch;
    });
  }

  res.render("index.html", {
    title: searchParameter ? `Suche: ${searchParameter}` : "Home Page",
    entryData,
    searchParameter,
    total: entryData.length,
  });
}