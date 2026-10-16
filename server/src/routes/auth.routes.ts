import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { authenticate } from "../middlewares/authenticate";
import { verifyTurnstile } from "../middlewares/turnstile";
import {
  emailVerificationRateLimiter,
  loginAccountRateLimiter,
  loginIpRateLimiter,
  registerRateLimiter,
} from "../middlewares/rateLimiter";

const router = Router();

router.post("/register", registerRateLimiter, verifyTurnstile, authController.register);
router.post(
  "/login",
  loginIpRateLimiter,
  verifyTurnstile,
  loginAccountRateLimiter,
  authController.login
);
router.post("/verify-email", emailVerificationRateLimiter, authController.verifyEmailToken);
router.post(
  "/resend-verification",
  emailVerificationRateLimiter,
  verifyTurnstile,
  authController.resendVerificationEmail
);
router.post("/logout", authController.logout);
router.get("/me", authenticate, authController.me);

export default router;