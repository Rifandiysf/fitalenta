import { Router } from "express";
import * as universityPartnerController from "../controllers/universityPartner.controller";

const router = Router();
router.get("/", universityPartnerController.index);
export default router;