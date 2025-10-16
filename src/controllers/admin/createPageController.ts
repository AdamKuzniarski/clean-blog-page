import type { Request, Response } from "express";
import { randomUUID } from "node:crypto";


export default async function createPageController (req: Request, res: Response):Promise<void>  {
      const newId = randomUUID();
  res.render("../views/admin/createPage.html", {
    title: "Create New Entry",
    newId
  });
};

