import express from "express";
import { aboutController } from "../controllers/aboutController";
import { homeController } from "../controllers/homeController";
import { contactController } from "../controllers/contactController";

const router = express.Router();

router
  .get("/", homeController)
  .get("/contact", contactController)
  .get("/about", aboutController);

export default router;