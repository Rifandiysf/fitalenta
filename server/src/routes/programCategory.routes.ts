import { Router } from "express";
import * as programCategoryController from "../controllers/programCategory.controller";

const router = Router();
router.get("/", programCategoryController.index);
export default router;