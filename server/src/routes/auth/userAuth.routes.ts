import { Router } from "express";
import * as userAuthController from "../../controllers/auth/userAuth.controller"
import { authenticate } from "../../middlewares/authenticate";

const router = Router();

router.post("/register", userAuthController.register);
router.post("/login", userAuthController.login);
router.post("/logout", userAuthController.logout);
router.get("/me", authenticate, userAuthController.me);

export default router;