import "dotenv/config";
import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import nunjucks from "nunjucks";
import entryData from "./data/entries.json";
import publicRoutes from "./routes/publicRoutes";
import adminRoutes from "./routes/adminRoutes";


const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // für form-urlencoded (HTML forms)
app.use(express.json()); // für JSON body


const nunEnv = nunjucks.configure("src/views", {
  autoescape: true,
  express: app,
});
// Filter -Datum-Formatierung
nunEnv.addFilter("formatDate", function (timestamp: number) {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});


//routing 
app.use(publicRoutes).use("/admin", adminRoutes);

//routing dynamik
app.get("/post/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const post = entryData.find((entry) => entry.id === id);

  if (!post) {
    return res.status(404).send("Post not found");
  }

  res.render("post.html", {
    title: post.title || "Blog Post",
    post,
  });
});

app.listen(PORT, () => {
  console.log(`server is Running at http://localhost:${PORT}`);
});
