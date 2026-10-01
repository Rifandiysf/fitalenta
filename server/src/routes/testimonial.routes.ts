import { Router } from "express";
import * as testimonialController from "../controllers/testimonial.controller";

const router = Router();
router.get("/", testimonialController.index);
export default router;