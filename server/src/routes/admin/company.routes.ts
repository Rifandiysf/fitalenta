import { Router } from "express";
import * as adminCompanyController from "../../controllers/admin/company.controller";
import { authenticate } from "../../middlewares/authenticate";
import { authorize } from "../../middlewares/authorize";
import { uploadCompanyLogo } from "../../middlewares/upload";

const router = Router();
router.use(authenticate, authorize("admin", "editor"));
router.get("/", adminCompanyController.index);
router.post("/", uploadCompanyLogo.single("logo"), adminCompanyController.store);
router.put("/:id", uploadCompanyLogo.single("logo"), adminCompanyController.update);
router.delete("/:id", adminCompanyController.destroy);
export default router;