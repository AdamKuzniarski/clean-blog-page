import express from "express";
import { entriesListing } from "../controllers/admin/blogController";



const router = express.Router();

router
  .get("/admin", entriesListing)
  

export default router;