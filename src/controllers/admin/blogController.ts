import type { Request, Response } from "express";

export const entriesListing = (req: Request, res: Response) => {
  res.render("../views/admin/indexPage.html", {
    title: "Admin Page",    
  });
};
