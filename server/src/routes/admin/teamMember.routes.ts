import { Router } from "express";
import * as adminTeamMemberController from "../../controllers/admin/teamMember.controller";
import { authenticate } from "../../middlewares/authenticate";
import { authorize } from "../../middlewares/authorize";

const router = Router();
router.use(authenticate, authorize("admin", "editor"));
router.get("/", adminTeamMemberController.index);
router.get("/:id", adminTeamMemberController.show);
router.post("/", adminTeamMemberController.store);
router.put("/:id", adminTeamMemberController.update);
router.delete("/:id", adminTeamMemberController.destroy);

export default router;