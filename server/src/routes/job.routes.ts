import { Router } from "express";
import * as jobController from "../controllers/job.controller";

const router = Router();
router.get("/", jobController.index);
router.get("/:id", jobController.show);
export default router;