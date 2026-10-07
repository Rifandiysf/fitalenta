import { Router } from "express";
import * as notificationController from "../../controllers/user/notification.controller";
import { authenticate } from "../../middlewares/authenticate";

const router = Router();
router.use(authenticate);
router.get("/", notificationController.index);
router.patch("/:id/read", notificationController.markRead);
router.patch("/read-all", notificationController.markAllRead);
export default router;