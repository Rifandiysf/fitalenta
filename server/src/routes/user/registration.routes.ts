import { Router } from "express";
import * as registrationController from "../../controllers/user/registration.controller";
import { authenticate } from "../../middlewares/authenticate";
import { uploadRegistrationFiles } from "../../middlewares/upload";
import { validate } from "../../middlewares/validate";
import { createRegistrationRules } from "../../validators/registration.validator";

const router = Router();

router.use(authenticate);
router.get("/", registrationController.index);
router.get("/:id", registrationController.show);
router.post("/", uploadRegistrationFiles, validate(createRegistrationRules), registrationController.store);

export default router;