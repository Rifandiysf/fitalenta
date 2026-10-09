import { Router } from "express";
import * as dashboardController from "../../controllers/admin/dashboard.controller";
import { ADMIN_PANEL_ROLES } from "../../config/admin.config";
import { authenticate } from "../../middlewares/authenticate";
import { authorize } from "../../middlewares/authorize";
import { validate } from "../../middlewares/validate";
import { listRegistrationsRules, registrationDetailRules } from "../../validators/dashboard.validator";

const router = Router();

router.use(authenticate, authorize(...ADMIN_PANEL_ROLES));
router.get("/summary", dashboardController.summary);
router.get("/filters", dashboardController.filters);
router.get("/registrations", validate(listRegistrationsRules), dashboardController.registrations);
router.get("/registrations/:id", validate(registrationDetailRules), dashboardController.registrationDetail);

export default router;