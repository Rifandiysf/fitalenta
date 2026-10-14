import { Router } from "express";
import * as adminProgramCategoryController from "../../controllers/admin/programCategory.controller";
import { cmsAccess } from "../../middlewares/access";

const router = Router();
router.use(...cmsAccess);
router.get("/", adminProgramCategoryController.index);
router.post("/", adminProgramCategoryController.store);
router.put("/:id", adminProgramCategoryController.update);
router.delete("/:id", adminProgramCategoryController.destroy);
export default router;