import { Router } from "express";
import * as adminJobController from "../../controllers/admin/job.controller";
import { cmsAccess } from "../../middlewares/access";

const router = Router();
router.use(...cmsAccess);
router.get("/", adminJobController.index);
router.get("/:id", adminJobController.show);
router.post("/", adminJobController.store);
router.put("/:id", adminJobController.update);
router.delete("/:id", adminJobController.destroy);
export default router;