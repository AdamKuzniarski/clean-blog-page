import type { Request, Response } from "express";

export const aboutController = (req: Request, res: Response) => {
  res.render("about.html", {
    meta: {
      title: "About Page",
    },
    headerData: {
      title: "About PageTestXX",
    },
  });
};
