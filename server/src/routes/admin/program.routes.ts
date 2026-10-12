import { Router } from "express";
import * as programController from "../../controllers/admin/program.controller";
import { ADMIN_PANEL_ROLES } from "../../config/admin.config";
import { authenticate } from "../../middlewares/authenticate";
import { authorize } from "../../middlewares/authorize";
import { validate } from "../../middlewares/validate";
import {
  createProgramRules,
  listProgramsRules,
  programIdRules,
  updateProgramRules,
} from "../../validators/program.validator";

const router = Router();

router.use(authenticate, authorize(...ADMIN_PANEL_ROLES));
router.get("/summary", programController.summary);
router.get("/options", programController.options);
router.get("/", validate(listProgramsRules), programController.index);
router.post("/", validate(createProgramRules), programController.store);
router.get("/:id", validate(programIdRules), programController.show);
router.put("/:id", validate(updateProgramRules), programController.update);
router.delete("/:id", validate(programIdRules), programController.destroy);

export default router;