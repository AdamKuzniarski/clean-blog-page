import "dotenv/config";

import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import nunjucks from "nunjucks";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

nunjucks.configure("src/templates", {
  autoescape: true,
  express: app,
});

app.get("/", (req: Request, res: Response) => {
  res.render("index.html", {
    title: "Home Page",
  });
});

app.listen(PORT, () => {
  console.log(`server is Running at http://localhost:${PORT}`);
});
