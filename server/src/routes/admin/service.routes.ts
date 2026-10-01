import { Router } from "express";
import * as adminServiceController from "../../controllers/admin/service.controller";
import { authenticate } from "../../middlewares/authenticate";
import { authorize } from "../../middlewares/authorize";

const router = Router();
router.use(authenticate, authorize("admin", "editor"));
router.get("/", adminServiceController.index);
router.post("/", adminServiceController.store);
router.put("/:id", adminServiceController.update);
router.delete("/:id", adminServiceController.destroy);

export default router;