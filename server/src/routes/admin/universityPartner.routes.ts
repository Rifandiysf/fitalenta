import { Router } from "express";
import * as adminUniversityPartnerController from "../../controllers/admin/universityPartner.controller";
import { authenticate } from "../../middlewares/authenticate";
import { authorize } from "../../middlewares/authorize";
import { uploadUniversityLogo } from "../../middlewares/upload";

const router = Router();
router.use(authenticate, authorize("admin", "editor"));
router.get("/", adminUniversityPartnerController.index);
router.post("/", uploadUniversityLogo.single("logo"), adminUniversityPartnerController.store);
router.put("/:id", uploadUniversityLogo.single("logo"), adminUniversityPartnerController.update);
router.delete("/:id", adminUniversityPartnerController.destroy);
export default router;