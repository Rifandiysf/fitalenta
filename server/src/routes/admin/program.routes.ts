import { Router } from "express";
import * as adminProgramController from "../../controllers/admin/program.controller";
import { authenticate } from "../../middlewares/authenticate";
import { authorize } from "../../middlewares/authorize";

const router = Router();
router.use(authenticate, authorize("admin", "editor"));
router.get("/", adminProgramController.index);
router.get("/:id", adminProgramController.show);
router.post("/", adminProgramController.store);
router.put("/:id", adminProgramController.update);
router.delete("/:id", adminProgramController.destroy);
router.patch("/:id/toggle-running", adminProgramController.toggleRunning);
export default router;