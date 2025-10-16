import express from "express";
import { entriesListing } from "../controllers/admin/blogController";
import deleteController from "../controllers/admin/deleteController"
import updatePageController from "../controllers/admin/updatePageController"
import updateController from "../controllers/admin/updateController"
import createPageController from "../controllers/admin/createPageController"
import createController from "../controllers/admin/createController"
import { upload } from "../multerConfig";
const router = express.Router();

router
  .get("/", entriesListing)
  .get("/delete/:id", deleteController )
  .get("/update/:id", updatePageController)
  .post("/update/:id", updateController)
  .get("/create", createPageController)
  .post("/create",upload.single("imageFile"),  createController)

export default router;