import { Router } from "express";
import authRoutes from "./auth.routes";
import eventRoutes from "./event.routes";
import adminEventRoutes from "./admin/event.routes";
import articleRoutes from "./article.routes";
import adminArticleRoutes from "./admin/article.routes";
import contactRoutes from "./contact.routes";
import adminContactRoutes from "./admin/contact.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/events", eventRoutes);
router.use("/admin/events", adminEventRoutes);
router.use("/articles", articleRoutes);
router.use("/admin/articles", adminArticleRoutes);
router.use("/contact", contactRoutes);
router.use("/admin/contact-messages", adminContactRoutes);

export default router;