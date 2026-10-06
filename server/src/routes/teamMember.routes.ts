import { Router } from "express";
import * as teamMemberController from "../controllers/teamMember.controller";

const router = Router();
router.get("/", teamMemberController.index);

export default router;