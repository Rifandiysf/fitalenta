import { Router } from "express";
import * as adminCompanyController from "../../controllers/admin/company.controller";
import { cmsAccess } from "../../middlewares/access";
import { uploadCompanyLogo } from "../../middlewares/upload";

const router = Router();
router.use(...cmsAccess);
router.get("/", adminCompanyController.index);
router.post("/", uploadCompanyLogo.single("logo"), adminCompanyController.store);
router.put("/:id", uploadCompanyLogo.single("logo"), adminCompanyController.update);
router.delete("/:id", adminCompanyController.destroy);
export default router;