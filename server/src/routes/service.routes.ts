import { Router } from "express";
import * as serviceController from "../controllers/service.controller";

const router = Router();
router.get("/", serviceController.index);
router.get("/:id", serviceController.show);

export default router;