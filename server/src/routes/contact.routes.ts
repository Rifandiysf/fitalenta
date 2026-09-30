import { Router } from "express";
import { submit } from "../controllers/contact.controller";
import { contactRateLimiter } from "../middlewares/rateLimiter";

const router = Router();

router.post("/", contactRateLimiter, submit);

export default router;