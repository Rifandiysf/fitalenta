import { Router } from "express";
import authRoutes from "./auth.routes";
import eventRoutes from "./event.routes";
import adminEventRoutes from "./admin/event.routes";
import articleRoutes from "./article.routes";
import adminArticleRoutes from "./admin/article.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/events", eventRoutes);
router.use("/admin/events", adminEventRoutes);
router.use("/articles", articleRoutes);
router.use("/admin/articles", adminArticleRoutes);

export default router;