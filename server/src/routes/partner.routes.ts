import { Router } from "express";
import * as partnerController from "../controllers/partner.controller";

const router = Router();
router.get("/", partnerController.index);
export default router;
