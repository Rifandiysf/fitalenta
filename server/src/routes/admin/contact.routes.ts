import { Router } from "express";
import * as adminContactController from "../../controllers/admin/contact.controller";
import { cmsAccess } from "../../middlewares/access";

const router = Router();

router.use(...cmsAccess);

router.get("/", adminContactController.index);
router.get("/:id", adminContactController.show);
router.delete("/:id", adminContactController.destroy);

export default router;