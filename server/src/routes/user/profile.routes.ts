import { Router } from "express";
import * as profileController from "../../controllers/user/profile.controller";
import { authenticate } from "../../middlewares/authenticate";

const router = Router();
router.use(authenticate);
router.get("/", profileController.show);
router.put("/", profileController.update);
export default router;