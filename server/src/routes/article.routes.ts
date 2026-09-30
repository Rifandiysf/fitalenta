import { Router } from "express";
import * as articleController from "../controllers/article.controller";

const router = Router();

router.get("/", articleController.index);
router.get("/featured", articleController.featured);
router.get("/:slug", articleController.show);

export default router;