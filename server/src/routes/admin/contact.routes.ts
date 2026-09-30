import { Router } from "express";
import * as adminContactController from "../../controllers/admin/contact.controller";
import { authenticate } from "../../middlewares/authenticate";
import { authorize } from "../../middlewares/authorize";

const router = Router();

router.use(authenticate, authorize("admin", "editor"));

router.get("/", adminContactController.index);
router.get("/:id", adminContactController.show);
router.delete("/:id", adminContactController.destroy);

export default router;