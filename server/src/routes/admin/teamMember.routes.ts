import { Router } from "express";
import * as teamMemberController from "../../controllers/admin/teamMember.controller";
import { ADMIN_PANEL_ROLES } from "../../config/admin.config";
import { authenticate } from "../../middlewares/authenticate";
import { authorize } from "../../middlewares/authorize";
import { uploadAboutImage, uploadTeamMemberImage } from "../../middlewares/upload";
import { validate } from "../../middlewares/validate";
import {
  aboutImageSlotRules,
  createExpertRules,
  expertIdRules,
  listExpertsRules,
  reorderExpertsRules,
  updateAboutRules,
  updateExpertRules,
} from "../../validators/teamMember.validator";

const router = Router();

router.use(authenticate, authorize(...ADMIN_PANEL_ROLES));

router.get("/", validate(listExpertsRules), teamMemberController.index);

router.get("/about", teamMemberController.showAbout);
router.put("/about", validate(updateAboutRules), teamMemberController.updateAbout);
router.post(
  "/about/images/:slot",
  uploadAboutImage.single("image"),
  validate(aboutImageSlotRules),
  teamMemberController.uploadAboutImage
);
router.delete("/about/images/:slot", validate(aboutImageSlotRules), teamMemberController.destroyAboutImage);

router.get("/experts", validate(listExpertsRules), teamMemberController.listExperts);
router.post(
  "/experts",
  uploadTeamMemberImage.single("image"),
  validate(createExpertRules),
  teamMemberController.storeExpert
);
router.patch("/experts/reorder", validate(reorderExpertsRules), teamMemberController.reorderExperts);
router.get("/experts/:id", validate(expertIdRules), teamMemberController.showExpert);
router.put(
  "/experts/:id",
  uploadTeamMemberImage.single("image"),
  validate(updateExpertRules),
  teamMemberController.updateExpert
);
router.delete("/experts/:id", validate(expertIdRules), teamMemberController.destroyExpert);

export default router;