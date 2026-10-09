import { Router } from "express";
import * as aboutController from "../controllers/about.controller";

const router = Router();

router.get("/", aboutController.show);

export default router;