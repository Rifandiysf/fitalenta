import { Router } from "express";
import * as adminProgramCategoryController from "../../controllers/admin/programCategory.controller";
import { authenticate } from "../../middlewares/authenticate";
import { authorize } from "../../middlewares/authorize";

const router = Router();
router.use(authenticate, authorize("admin", "editor"));
router.get("/", adminProgramCategoryController.index);
router.post("/", adminProgramCategoryController.store);
router.put("/:id", adminProgramCategoryController.update);
router.delete("/:id", adminProgramCategoryController.destroy);
export default router;