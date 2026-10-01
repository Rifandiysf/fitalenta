import { Router } from "express";
import * as adminClientController from "../../controllers/admin/client.controller";
import { authenticate } from "../../middlewares/authenticate";
import { authorize } from "../../middlewares/authorize";
import { uploadClientLogo } from "../../middlewares/upload";

const router = Router();
router.use(authenticate, authorize("admin", "editor"));
router.get("/", adminClientController.index);
router.post("/", uploadClientLogo.single("logo"), adminClientController.store);
router.put("/:id", uploadClientLogo.single("logo"), adminClientController.update);
router.delete("/:id", adminClientController.destroy);
router.patch("/:id/toggle", adminClientController.toggle);
export default router;