import { Router } from "express";
import * as adminJobController from "../../controllers/admin/job.controller";
import { authenticate } from "../../middlewares/authenticate";
import { authorize } from "../../middlewares/authorize";

const router = Router();
router.use(authenticate, authorize("admin", "editor"));
router.get("/", adminJobController.index);
router.get("/:id", adminJobController.show);
router.post("/", adminJobController.store);
router.put("/:id", adminJobController.update);
router.delete("/:id", adminJobController.destroy);
export default router;