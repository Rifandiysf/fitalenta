import { Router } from "express";
import userAuthRoutes from "./auth/userAuth.routes";
import adminAuthRoutes from "./auth/adminAuth.routes";

const router = Router();

router.use("/auth/user", userAuthRoutes);
router.use("/auth/admin", adminAuthRoutes);

export default router;