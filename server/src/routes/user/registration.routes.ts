import { Router } from "express";
import * as registrationController from "../../controllers/user/registration.controller";
import { authenticate } from "../../middlewares/authenticate";

const router = Router();
router.use(authenticate);
router.get("/", registrationController.index);
router.get("/:id", registrationController.show);
export default router;