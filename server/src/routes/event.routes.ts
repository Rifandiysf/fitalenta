import { Router } from "express";
import * as eventController from "../controllers/event.controller";

const router = Router();

router.get("/", eventController.index);
router.get("/featured", eventController.featured);
router.get("/:slug", eventController.show);

export default router;