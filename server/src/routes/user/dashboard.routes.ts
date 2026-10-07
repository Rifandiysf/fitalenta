import { Router } from "express";
import * as dashboardController from "../../controllers/user/dashboard.controller";
import { authenticate } from "../../middlewares/authenticate";

const router = Router();
router.use(authenticate);
router.get("/", dashboardController.show);
export default router;