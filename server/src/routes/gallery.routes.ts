import { Router } from "express";
import * as galleryController from "../controllers/gallery.controller";

const router = Router();
router.get("/", galleryController.index);
router.get("/:id", galleryController.show);

export default router;