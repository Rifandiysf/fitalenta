import { Router } from "express";
import authRoutes from "./auth.routes";
import eventRoutes from "./event.routes";
import adminEventRoutes from "./admin/event.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/events", eventRoutes);
router.use("/admin/events", adminEventRoutes);

export default router;