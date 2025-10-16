import type { Request, Response } from "express";

export default async function createPageController (req: Request, res: Response):Promise<void>  {
  res.render("../views/admin/createPage.html", {
    title: "Create New Entry",
  });
};

