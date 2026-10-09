import { Router } from "express";
import * as userController from "../../controllers/admin/user.controller";
import { ADMIN_PANEL_ROLES } from "../../config/admin.config";
import { authenticate } from "../../middlewares/authenticate";
import { authorize } from "../../middlewares/authorize";
import { validate } from "../../middlewares/validate";
import {
  createUserRules,
  listUsersRules,
  updateUserRules,
  userIdRules,
} from "../../validators/user.validator";

const router = Router();

router.use(authenticate, authorize(...ADMIN_PANEL_ROLES));
router.get("/summary", userController.summary);
router.get("/", validate(listUsersRules), userController.index);
router.post("/", validate(createUserRules), userController.store);
router.get("/:id", validate(userIdRules), userController.show);
router.put("/:id", validate(updateUserRules), userController.update);
router.delete("/:id", validate(userIdRules), userController.destroy);

export default router;