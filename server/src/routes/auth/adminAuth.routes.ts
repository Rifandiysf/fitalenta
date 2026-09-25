import { Router } from "express";
import * as adminAuthController from "../../controllers/auth/adminAuth.controller";
import { authenticate } from "../../middlewares/authenticate";
import { authorize } from "../../middlewares/authorize";

const router = Router();

router.post("/login", adminAuthController.login);
router.post("/logout", adminAuthController.logout);
router.get("/me", authenticate, authorize("admin", "editor"), adminAuthController.me);

export default router;