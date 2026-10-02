import { Router } from "express";
import * as programController from "../controllers/program.controller";

const router = Router();
router.get("/", programController.index);
router.get("/:id", programController.show);
export default router;