import type { Request, Response } from "express";

export const contactController = (req: Request, res: Response) => {
  res.render("contact.html", {
    meta: {
      title: "Contact Page",
    },
    headerData: {
      title: "Contact PageTest",
    },
  });
};
